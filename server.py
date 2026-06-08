import os
import json
import logging
from flask import Flask, request, jsonify
import requests

# ------------ Config ------------
WHATSAPP_TOKEN  = os.getenv("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERIFY_TOKEN    = os.getenv("VERIFY_TOKEN", "verify_me_123")
OPENAI_API_KEY  = os.getenv("OPENAI_API_KEY")  # না থাকলে fallback টেক্সট পাঠাবে
GRAPH_VERSION   = os.getenv("GRAPH_VERSION", "v20.0")
PORT            = int(os.getenv("PORT", "10000"))

GRAPH_BASE = f"https://graph.facebook.com/{GRAPH_VERSION}/{PHONE_NUMBER_ID}"

# Basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("wa-bot")

# স্টার্টআপে config চেক করে warning দেখায় — কী missing সেটা সহজে বোঝা যায়
def _check_config():
    problems = []
    if not WHATSAPP_TOKEN:
        problems.append("WHATSAPP_TOKEN is NOT set — reply পাঠানো যাবে না")
    if not PHONE_NUMBER_ID:
        problems.append("PHONE_NUMBER_ID is NOT set — reply পাঠানো যাবে না")
    if not OPENAI_API_KEY:
        problems.append("OPENAI_API_KEY is NOT set — fallback টেক্সট পাঠাবে (AI বন্ধ)")
    if problems:
        for p in problems:
            log.warning("CONFIG: %s", p)
    else:
        log.info("CONFIG: সব environment variable ঠিক আছে ✅")
    return problems

_check_config()

# ------------ Helpers ------------
def wa_send_text(to: str, body: str):
    """WhatsApp-এ টেক্সট পাঠায়। সফল/ব্যর্থ — দুটোই লগ করে।"""
    if not WHATSAPP_TOKEN or not PHONE_NUMBER_ID:
        log.error("WA send skipped: WHATSAPP_TOKEN/PHONE_NUMBER_ID missing")
        return {"error": "missing_credentials"}

    url = f"{GRAPH_BASE}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"preview_url": False, "body": body}
    }
    try:
        r = requests.post(url, headers=headers, json=payload, timeout=30)
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
        log.info("WA send ok -> %s", to)
    return data

def ai_reply(user_text: str) -> str:
    """OpenAI দিয়ে স্মার্ট রেসপন্স বানায়; key না থাকলে fallback দেয়"""
    if not OPENAI_API_KEY:
        return ("Thanks! Please share service type (plumbing/electrical), "
                "location, preferred time, and budget. We’ll reply quickly.")

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    body = {
        "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        "temperature": 0.4,
        "messages": [
            {"role": "system",
             "content": ("You are a concise, friendly support agent for Handyman Maldives. "
                         "Greet briefly, ask for missing details (location, service type, "
                         "preferred time, budget) and give clear next steps. "
                         "Reply in user's language if obvious.")},
            {"role": "user", "content": user_text}
        ]
    }
    try:
        resp = requests.post(url, headers=headers, json=body, timeout=45)
    except requests.RequestException as e:
        log.exception("OpenAI network error: %s", e)
        return "Sorry, I had a problem replying. Please try again."

    try:
        data = resp.json()
    except Exception:
        log.exception("OpenAI non-JSON response")
        return "Sorry, I had a problem replying. Please try again."
    if resp.status_code >= 400:
        log.error("OpenAI error %s: %s", resp.status_code, data)
        return "Sorry, I had a problem replying. Please try again."
    return data["choices"][0]["message"]["content"].strip()

# ------------ App ------------
app = Flask(__name__)

@app.get("/")
def health():
    return {"ok": True, "service": "wa-ai-autoreply"}

@app.get("/status")
def status():
    """কোন config সেট আছে সেটা দেখায় (secret leak করে না) — debug করার জন্য"""
    return {
        "ok": True,
        "service": "wa-ai-autoreply",
        "graph_version": GRAPH_VERSION,
        "config": {
            "WHATSAPP_TOKEN": bool(WHATSAPP_TOKEN),
            "PHONE_NUMBER_ID": bool(PHONE_NUMBER_ID),
            "VERIFY_TOKEN_set": bool(VERIFY_TOKEN),
            "OPENAI_API_KEY": bool(OPENAI_API_KEY),
            "ai_enabled": bool(OPENAI_API_KEY),
        },
        "problems": _check_config(),
    }

@app.get("/send-test")
def send_test():
    """ম্যানুয়ালি একটা টেস্ট মেসেজ পাঠায়: /send-test?to=9607XXXXXXX&text=hi
    এটা দিয়ে বোঝা যায় WhatsApp token/credential ঠিক আছে কিনা।"""
    to = request.args.get("to")
    text = request.args.get("text", "Test message from wa-ai-autoreply ✅")
    if not to:
        return jsonify({"error": "missing 'to' query param, e.g. ?to=9607XXXXXXX"}), 400
    result = wa_send_text(to, text)
    return jsonify({"sent_to": to, "result": result})

# Webhook verification (GET)
@app.get("/webhook")
def verify():
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    if mode == "subscribe" and token == VERIFY_TOKEN:
        log.info("Webhook verified ✅")
        return challenge, 200
    log.warning("Webhook verify failed: mode=%s token_match=%s",
                mode, token == VERIFY_TOKEN)
    return "Forbidden", 403

# Receive messages (POST)
@app.post("/webhook")
def incoming():
    payload = request.get_json(silent=True) or {}
    log.info("Incoming: %s", json.dumps(payload)[:2000])

    # WhatsApp মাঝেমধ্যে status/ack পাঠায় — এগুলো স্কিপ করা
    try:
        value = payload["entry"][0]["changes"][0]["value"]
    except Exception:
        return jsonify({"ignored": True, "reason": "no value"}), 200

    # status update (delivered/read) হলে স্কিপ
    if value.get("statuses"):
        return jsonify({"ignored": True, "reason": "status update"}), 200

    messages = value.get("messages", [])
    if not messages:
        return jsonify({"ignored": True, "reason": "no messages"}), 200

    msg = messages[0]
    from_ = msg.get("from")
    msg_type = msg.get("type", "text")

    # কেবল টেক্সট হলে কনটেন্ট; না হলে ছোট বার্তা
    if msg_type == "text":
        user_text = msg.get("text", {}).get("body", "").strip()
    else:
        user_text = "(non-text message)"

    log.info("Message from %s (%s): %s", from_, msg_type, user_text)

    # স্মার্ট রিপ্লাই (AI বা fallback)
    reply_text = ai_reply(user_text)
    wa_send_text(from_, reply_text)

    return jsonify({"ok": True}), 200

if __name__ == "__main__":
    # Flask dev server (Render free-তে চলবে); Gunicorn থাকলে Procfile দিয়ে চলবে
    app.run(host="0.0.0.0", port=PORT)
