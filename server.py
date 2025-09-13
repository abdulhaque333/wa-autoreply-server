import os, requests
from flask import Flask, request, jsonify

app = Flask(__name__)

WHATSAPP_TOKEN  = os.getenv("WHATSAPP_TOKEN")      # permanent token
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")     # e.g. 123456789012345
VERIFY_TOKEN    = os.getenv("VERIFY_TOKEN", "verify_me_123")

GRAPH_URL = f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages"

def wa_send_text(to: str, body: str):
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": body}
    }
    r = requests.post(GRAPH_URL, headers=headers, json=payload, timeout=30)
    return r.status_code, r.text

@app.get("/")
def health():
    return {"ok": True, "service": "wa-autoreply"}

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
    data = request.get_json(silent=True) or {}
    try:
        entry = data["entry"][0]["changes"][0]["value"]
        messages = entry.get("messages", [])
        if not messages:
            return jsonify({"ignored": True}), 200

        msg = messages[0]
        from_ = msg["from"]
        text = msg["text"]["body"] if msg.get("type") == "text" else "(non-text)"

        # খুব সিম্পল অটো-রিপ্লাই (চাইলে কাস্টম লজিক/FAQ বসাতে পারবেন)
        reply = f"Thanks! We received: {text}"
        wa_send_text(from_, reply)

        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 200

if __name__ == "__main__":
    # Render ফ্রি প্ল্যানে 0.0.0.0 দরকার
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "10000")))
