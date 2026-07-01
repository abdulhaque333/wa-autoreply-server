# Best Cool — AC Repair & Servicing Website

A single-page website for **Best Cool**, an air-conditioner repair & servicing business.
It is fully self-contained: just one `index.html` file with all styling and scripts inside — no build step, no dependencies.

> This site is **completely separate** from any other project. Put it in its own
> repository and host it on its own server/domain — nothing here is shared with another site.

---

## 1. Set your details (1 minute)

Open `index.html`, find the `CONFIG` block near the bottom, and change the phone number:

```js
const CONFIG = {
  phone: "9609250333",   // no + or spaces (Maldives 7771234 -> 9607771234)
  whatsappText: "Hi Best Cool, I need help with my AC.",
  area: "Malé & nearby islands",
  hours: "Sat–Thu, 9am – 9pm"
};
```

That single number powers the **Call** button, all **WhatsApp** buttons, and the floating chat bubble.
It is already set to **+960 9250333** — change it here if the number changes.

Prices in the **Pricing** section live directly in `index.html` (search for `price-row`) — edit the
service names and amounts there anytime.

---

## 2. Put it in its own GitHub repository

Because this must stay separate, create a **brand-new empty repo** (e.g. `best-cool`) on GitHub, then:

```bash
# inside the bestcool/ folder
git init
git add .
git commit -m "Best Cool website"
git branch -M main
git remote add origin https://github.com/<your-username>/best-cool.git
git push -u origin main
```

---

## 3. Publish it (pick one — both are free)

**Option A — GitHub Pages**
1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → Save
3. Live at `https://<your-username>.github.io/best-cool/` in ~1 minute.

**Option B — Netlify (custom domain friendly)**
1. Go to app.netlify.com → **Add new site → Import an existing project**
2. Pick the `best-cool` repo. Leave build command empty, publish directory `/`.
3. Deploy. Add a custom domain under **Domain settings** if you have one.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire website (HTML + CSS + JS) |
| `logo.jpg` | Best Cool logo (header, footer, favicon) |
| `robots.txt` | Lets search engines index the site |
| `.nojekyll` | Ensures GitHub Pages serves all files as-is |
