import os
import json
import logging
from collections import OrderedDict
from flask import Flask, request, jsonify
import requests

# ------------ Config ------------
WHATSAPP_TOKEN  = os.getenv("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERIFY_TOKEN    = os.getenv("VERIFY_TOKEN", "verify_me_123")
OPENAI_API_KEY  = os.getenv("OPENAI_API_KEY")   # বর্তমানে booking-flow ব্যবহার হয়, AI ঐচ্ছিক
OWNER_NUMBER    = os.getenv("OWNER_NUMBER")      # থাকলে প্রতিটি booking owner-কে notify করবে
GRAPH_VERSION   = os.getenv("GRAPH_VERSION", "v20.0")
BUSINESS_NAME   = os.getenv("BUSINESS_NAME", "Handyman Maldives")
PORT            = int(os.getenv("PORT", "10000"))

GRAPH_BASE = f"https://graph.facebook.com/{GRAPH_VERSION}/{PHONE_NUMBER_ID}"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("wa-bot")

def _check_config():
    problems = []
    if not WHATSAPP_TOKEN:
        problems.append("WHATSAPP_TOKEN is NOT set — reply পাঠানো যাবে না")
    if not PHONE_NUMBER_ID:
        problems.append("PHONE_NUMBER_ID is NOT set — reply পাঠানো যাবে না")
    for p in problems:
        log.warning("CONFIG: %s", p)
    if not problems:
        log.info("CONFIG: সব দরকারি environment variable ঠিক আছে ✅")
    return problems

_check_config()

# ------------ Services / Booking flow ------------
# (id, customer-facing title) — title সর্বোচ্চ 24 অক্ষর
SERVICES = [
    ("svc_moving",   "Apartment Moving"),
    ("svc_aircon",   "Aircon Repair"),
    ("svc_painting", "Painting"),
    ("svc_tiling",   "Tiling"),
    ("svc_masonry",  "Masonry Work"),
    ("svc_other",    "Other / Not sure"),
]
SERVICE_TITLE = {sid: title for sid, title in SERVICES}

# টেক্সট দিয়ে সার্ভিস খুঁজে পাওয়ার সহজ কীওয়ার্ড (কেউ select না করে টাইপ করলে)
SERVICE_KEYWORDS = {
    "svc_moving":   ["move", "moving", "shift", "relocat"],
    "svc_aircon":   ["aircon", "ac ", "a/c", "air con", "cooling", "ac repair"],
    "svc_painting": ["paint"],
    "svc_tiling":   ["tile", "tiling"],
    "svc_masonry":  ["mason", "concrete", "brick", "cement", "plaster"],
}

GREETINGS = {
    "hi", "hello", "hey", "start", "menu", "book", "booking", "hello!",
    "salam", "salaam", "assalamualaikum", "assalamu alaikum", "kihineh",
    "হাই", "হ্যালো", "বুকিং",
}

# phone -> {"step": str, "data": dict}
sessions = {}

# duplicate webhook গুলো বাদ দিতে (WhatsApp একই message কয়েকবার পাঠাতে পারে)
_seen_ids = OrderedDict()
def _seen_before(mid: str) -> bool:
    if not mid:
        return False
    if mid in _seen_ids:
        return True
    _seen_ids[mid] = 1
    if len(_seen_ids) > 1000:
        _seen_ids.popitem(last=False)
    return False

# ------------ WhatsApp senders ------------
def _wa_post(payload: dict):
    """মূল sender — যেকোনো ধরনের message payload পাঠায়, সফল/ব্যর্থ লগ করে।"""
    if not WHATSAPP_TOKEN or not PHONE_NUMBER_ID:
        log.error("WA send skipped: WHATSAPP_TOKEN/PHONE_NUMBER_ID missing")
        return {"error": "missing_credentials"}
    url = f"{GRAPH_BASE}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json",
    }
    body = {"messaging_product": "whatsapp", **payload}
    try:
        r = requests.post(url, headers=headers, json=body, timeout=30)
    except requests.RequestException as e:
        log.exception("WA send network error: %s", e)
        return {"error": "network", "detail": str(e)}
    try:
        data = r.json()
    except Exception:
        data = {"raw": r.text}
    if r.status_code >= 400:
        log.error("WA send error %s: %s", r.status_code, data)
    else:
        log.info("WA send ok -> %s (%s)", payload.get("to"), payload.get("type"))
    return data

def wa_send_text(to: str, body: str):
    return _wa_post({"to": to, "type": "text",
                     "text": {"preview_url": False, "body": body}})

def wa_send_service_list(to: str):
    """সার্ভিস বেছে নেওয়ার interactive list পাঠায়।"""
    rows = [{"id": sid, "title": title} for sid, title in SERVICES]
    interactive = {
        "type": "list",
        "header": {"type": "text", "text": BUSINESS_NAME},
        "body": {"text": ("👋 Welcome! We're happy to help.\n\n"
                          "Please choose the service you need below 👇")},
        "footer": {"text": "Tap “Choose service” to start"},
        "action": {"button": "Choose service",
                   "sections": [{"title": "Our Services", "rows": rows}]},
    }
    return _wa_post({"to": to, "type": "interactive", "interactive": interactive})

def wa_send_confirm_buttons(to: str, summary: str):
    interactive = {
        "type": "button",
        "body": {"text": summary},
        "action": {"buttons": [
            {"type": "reply", "reply": {"id": "confirm_yes", "title": "✅ Confirm"}},
            {"type": "reply", "reply": {"id": "start_over", "title": "🔄 Start over"}},
        ]},
    }
    return _wa_post({"to": to, "type": "interactive", "interactive": interactive})

# ------------ Booking state machine ------------
def _match_service_from_text(text: str):
    lc = (text or "").lower()
    for sid, words in SERVICE_KEYWORDS.items():
        if any(w in lc for w in words):
            return sid
    return None

def handle_message(from_: str, kind: str, text: str, inter_id: str, inter_title: str):
    lc = (text or "").strip().lower()
    sess = sessions.get(from_)

    # যেকোনো সময় restart / নতুন কথোপকথন শুরু
    if inter_id == "start_over" or lc in GREETINGS or sess is None:
        sessions[from_] = {"step": "service", "data": {}}
        wa_send_service_list(from_)
        return

    step = sess["step"]
    data = sess["data"]

    # ১) সার্ভিস বাছাই
    if step == "service":
        sid = None
        if inter_id and inter_id.startswith("svc_"):
            sid = inter_id
        elif text:
            sid = _match_service_from_text(text)
        if sid:
            data["service"] = SERVICE_TITLE.get(sid, inter_title or text)
            sess["step"] = "location"
            wa_send_text(from_, ("Great choice! 📍\n\n"
                                 "Which *area / address* do you need it at? "
                                 "(e.g. Malé, Hulhumalé, Villingili)"))
        else:
            wa_send_text(from_, "Please pick a service from the list below 👇")
            wa_send_service_list(from_)
        return

    # ২) এলাকা
    if step == "location":
        data["location"] = text or inter_title or "-"
        sess["step"] = "datetime"
        wa_send_text(from_, ("👍 Noted.\n\n"
                             "When would you like the service? 🗓️\n"
                             "(e.g. Tomorrow 10 AM, Friday afternoon)"))
        return

    # ৩) সময়
    if step == "datetime":
        data["datetime"] = text or "-"
        sess["step"] = "details"
        wa_send_text(from_, ("Almost done! 📝\n\n"
                             "Briefly describe the work and your approx budget.\n"
                             "(e.g. Paint 2 rooms, budget around 3000 MVR)"))
        return

    # ৪) বিস্তারিত → সারসংক্ষেপ + confirm
    if step == "details":
        data["details"] = text or "-"
        sess["step"] = "confirm"
        summary = (
            "Please review your request 👇\n\n"
            f"🔧 Service: {data.get('service','-')}\n"
            f"📍 Area: {data.get('location','-')}\n"
            f"🗓️ When: {data.get('datetime','-')}\n"
            f"📝 Details: {data.get('details','-')}\n\n"
            "Tap *Confirm* to submit, or *Start over* to redo."
        )
        wa_send_confirm_buttons(from_, summary)
        return

    # ৫) নিশ্চিতকরণ
    if step == "confirm":
        if inter_id == "confirm_yes" or lc in {"confirm", "yes", "ok", "okay"}:
            d = data
            wa_send_text(from_, ("🎉 Thank you! Your booking request has been received.\n\n"
                                 f"Our {BUSINESS_NAME} team will contact you shortly to confirm. 🙌\n\n"
                                 "Type *hi* anytime to start a new request."))
            log.info("BOOKING from %s: %s", from_, json.dumps(d, ensure_ascii=False))
            _notify_owner(from_, d)
            sessions.pop(from_, None)
        else:
            sessions[from_] = {"step": "service", "data": {}}
            wa_send_text(from_, "No problem, let's start again.")
            wa_send_service_list(from_)
        return

    # অজানা অবস্থা — রিসেট
    sessions.pop(from_, None)
    wa_send_service_list(from_)

def _notify_owner(customer: str, d: dict):
    """Owner-কে নতুন booking জানায় (best-effort)।"""
    if not OWNER_NUMBER:
        return
    msg = (
        "🔔 New booking request!\n\n"
        f"👤 Customer: +{customer}\n"
        f"🔧 Service: {d.get('service','-')}\n"
        f"📍 Area: {d.get('location','-')}\n"
        f"🗓️ When: {d.get('datetime','-')}\n"
        f"📝 Details: {d.get('details','-')}"
    )
    try:
        wa_send_text(OWNER_NUMBER, msg)
    except Exception as e:
        log.warning("Owner notify failed: %s", e)

# ------------ App ------------
app = Flask(__name__)

@app.get("/")
def health():
    return {"ok": True, "service": "wa-booking-bot"}

@app.get("/status")
def status():
    return {
        "ok": True,
        "service": "wa-booking-bot",
        "graph_version": GRAPH_VERSION,
        "config": {
            "WHATSAPP_TOKEN": bool(WHATSAPP_TOKEN),
            "PHONE_NUMBER_ID": bool(PHONE_NUMBER_ID),
            "VERIFY_TOKEN_set": bool(VERIFY_TOKEN),
            "OWNER_NUMBER_set": bool(OWNER_NUMBER),
            "ai_enabled": bool(OPENAI_API_KEY),
        },
        "active_sessions": len(sessions),
        "problems": _check_config(),
    }

@app.get("/send-test")
def send_test():
    to = request.args.get("to")
    if not to:
        return jsonify({"error": "missing 'to', e.g. ?to=9607XXXXXXX"}), 400
    # টেস্ট হিসেবে সার্ভিস লিস্টটাই পাঠাই
    result = wa_send_service_list(to)
    return jsonify({"sent_to": to, "result": result})

@app.get("/webhook")
def verify():
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    if mode == "subscribe" and token == VERIFY_TOKEN:
        log.info("Webhook verified ✅")
        return challenge, 200
    log.warning("Webhook verify failed")
    return "Forbidden", 403

@app.post("/webhook")
def incoming():
    payload = request.get_json(silent=True) or {}
    try:
        value = payload["entry"][0]["changes"][0]["value"]
    except Exception:
        return jsonify({"ignored": True}), 200

    if value.get("statuses"):
        return jsonify({"ignored": True, "reason": "status"}), 200

    messages = value.get("messages", [])
    if not messages:
        return jsonify({"ignored": True, "reason": "no messages"}), 200

    msg = messages[0]
    mid = msg.get("id")
    if _seen_before(mid):
        return jsonify({"ignored": True, "reason": "duplicate"}), 200

    from_ = msg.get("from")
    mtype = msg.get("type", "text")
    text = ""
    inter_id = None
    inter_title = None

    if mtype == "text":
        text = msg.get("text", {}).get("body", "").strip()
    elif mtype == "interactive":
        it = msg.get("interactive", {})
        if it.get("type") == "list_reply":
            inter_id = it["list_reply"].get("id")
            inter_title = it["list_reply"].get("title")
        elif it.get("type") == "button_reply":
            inter_id = it["button_reply"].get("id")
            inter_title = it["button_reply"].get("title")

    log.info("Message from %s (%s) text=%r inter=%r", from_, mtype, text, inter_id)

    try:
        handle_message(from_, mtype, text, inter_id, inter_title)
    except Exception as e:
        log.exception("handle_message failed: %s", e)
        wa_send_text(from_, "Sorry, something went wrong. Please type *hi* to start again.")

    return jsonify({"ok": True}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
