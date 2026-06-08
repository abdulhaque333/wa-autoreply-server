# WhatsApp AI Auto-Reply Server

WhatsApp Cloud API-র webhook receive করে, OpenAI দিয়ে স্মার্ট রিপ্লাই বানিয়ে
ফেরত পাঠায়। OpenAI key না থাকলে একটা ডিফল্ট fallback টেক্সট পাঠায়।

Python + Flask + Gunicorn। Render (বা যেকোনো host)-এ deploy করার জন্য তৈরি।

---

## ⚙️ প্রয়োজনীয় Environment Variables

Hosting (Render → Environment) এ এগুলো সেট করতে হবে:

| Variable | লাগবে? | কী জিনিস |
|----------|--------|----------|
| `WHATSAPP_TOKEN` | ✅ অবশ্যই | Meta WhatsApp Cloud API access token |
| `PHONE_NUMBER_ID` | ✅ অবশ্যই | WhatsApp sender-এর Phone number ID |
| `VERIFY_TOKEN` | ✅ অবশ্যই | তোমার বানানো একটা পাসওয়ার্ড (যেমন `verify_me_123`) — Meta webhook-এও একই দিতে হবে |
| `OPENAI_API_KEY` | ❌ ঐচ্ছিক | না দিলে AI বন্ধ, fallback টেক্সট যাবে |
| `OPENAI_MODEL` | ❌ ঐচ্ছিক | ডিফল্ট `gpt-4o-mini` |
| `GRAPH_VERSION` | ❌ ঐচ্ছিক | ডিফল্ট `v20.0` |

> ⚠️ Meta-র **temporary token মাত্র ২৪ ঘণ্টা** কাজ করে। স্থায়ীভাবে চালাতে
> System User বানিয়ে **permanent token** নাও। Token মেয়াদ শেষ হলে reply যাবে না।

---

## 🚀 Deploy (Render — one-click Blueprint)

এই repo-তে `render.yaml` আছে, তাই deploy সহজ:

1. [Render](https://render.com) এ লগইন করো → **New → Blueprint**
2. এই GitHub repo সিলেক্ট করো → Render নিজে থেকে service বানাবে
3. Deploy-এর সময় (বা পরে **Environment** ট্যাবে) এই value গুলো বসাও:
   - `WHATSAPP_TOKEN` — Meta থেকে আনা token
   - `PHONE_NUMBER_ID` — Meta থেকে আনা Phone number ID
   - `OPENAI_API_KEY` — (ঐচ্ছিক) AI চালু করতে
4. Deploy শেষ হলে নিচের Checklist দিয়ে যাচাই করো।

> বাকি variable (`VERIFY_TOKEN`, `OPENAI_MODEL`, `GRAPH_VERSION`) আগে থেকেই
> ডিফল্ট দেওয়া আছে — দরকার হলে বদলাও।

---

## ✅ সব ঠিক আছে কিনা চেক করার ধাপ (Checklist)

App deploy হওয়ার পর এই URL গুলো ব্রাউজারে খুলে দেখো (`<your-app>` = তোমার Render URL):

1. **App চালু আছে?**
   `https://<your-app>/`
   → `{"ok": true, ...}` দেখালে server চলছে।

2. **Config ঠিক আছে?**
   `https://<your-app>/status`
   → এখানে দেখাবে কোন variable সেট আছে আর কোনটা missing।
   `WHATSAPP_TOKEN` আর `PHONE_NUMBER_ID` অবশ্যই `true` হতে হবে।

3. **WhatsApp token সত্যিই কাজ করছে?**
   `https://<your-app>/send-test?to=9607XXXXXXX&text=hello`
   (`to` = তোমার নিজের WhatsApp নম্বর, country code সহ, `+` ছাড়া)
   → তোমার ফোনে message এলে token ঠিক আছে। না এলে `result`-এ error দেখবে।

4. **Webhook verify হয়েছে?**
   Meta dashboard → WhatsApp → Configuration → Webhook:
   - Callback URL: `https://<your-app>/webhook`
   - Verify token: `VERIFY_TOKEN`-এর সাথে হুবহু মিল
   - **"messages"** field-এ subscribe করতে ভুলো না — না করলে incoming message আসবেই না।

5. **পুরো ফ্লো টেস্ট:** অন্য একটা নম্বর থেকে তোমার WhatsApp business নম্বরে message দাও → bot-এর reply আসা উচিত।

---

## 🐞 সমস্যা হলে কোথায় দেখবে

- **Render → Logs** খুলে রাখো। প্রতিটা incoming message, send সফল/ব্যর্থ — সব লগে দেখাবে।
- `/status` এ `problems` লিস্টে কী missing সেটা সরাসরি বলে দেবে।
- reply না গেলে log-এ `WA send error` খোঁজো — সেখানে Meta-র আসল error message থাকবে
  (যেমন token expired, number not registered ইত্যাদি)।

---

## 🏃 Local-এ চালানো

```bash
pip install -r requirements.txt
export WHATSAPP_TOKEN=...   PHONE_NUMBER_ID=...   VERIFY_TOKEN=verify_me_123
python server.py
```
