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
PORT            = int(os.getenv("PORT", "10000"))

GRAPH_BASE = f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}"

# Basic logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger("wa-bot")

# ------------ Helpers ------------
def wa_send_text(to: str, body: str):
    """WhatsApp-এ টেক্সট পাঠায়"""
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
    r = requests.post(url, headers=headers, json=payload, timeout=30)
    try:
        data = r.json()
    except Exception:
        data = {"raw": r.text}
    if r.status_code >= 400:
        log.error("WA send error %s: %s", r.status_code, data)
    return data

def ai_reply(user_text: str) -> str:
    """OpenAI দিয়ে স্মার্ট রেসপন্স বানায়; key না থাকলে fallback দেয়"""
    if not OPENAI_API_KEY:
        return ("Thanks! Please share service type (plumbing/electrical), "
                "location, preferred time, and budget. We’ll reply quickly.")

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    body = {
        "model": "gpt-4o-mini",
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
    resp = requests.post(url, headers=headers, json=body, timeout=45)
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

# Webhook verification (GET)
@app.get("/webhook")
def verify():
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    if mode == "subscribe" and token == VERIFY_TOKEN:
        return challenge, 200
    return "Forbidden", 403

# Receive messages (POST)
@app.post("/webhook")
def incoming():
    payload = request.get_json(silent=True) or {}
    log.info("Incoming: %s", json.dumps(payload)[:2000])

    # WhatsApp মাঝেমধ্যে status/ack পাঠায় — এগুলো স্কিপ করা
    try:
        value = payload["entry"][0]["changes"][0]["value"]
    except Exception:
        return jsonify({"ignored": True}), 200

    messages = value.get("messages", [])
    if not messages:
        return jsonify({"ignored": True}), 200

    msg = messages[0]
    from_ = msg.get("from")
    msg_type = msg.get("type", "text")

    # কেবল টেক্সট হলে কনটেন্ট; না হলে ছোট বার্তা
    user_text = msg["text"]["body"].strip() if msg_type == "text" else "(non-text message)"

    # স্মার্ট রিপ্লাই (AI বা fallback)
    reply_text = ai_reply(user_text)
    wa_send_text(from_, reply_text)

    return jsonify({"ok": True}), 200

if __name__ == "__main__":
    # Flask dev server (Render free-তে চলবে); Gunicorn থাকলে Procfile দিয়ে চলবে
    app.run(host="0.0.0.0", port=PORT)
