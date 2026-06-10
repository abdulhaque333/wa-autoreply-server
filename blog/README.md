# Mohammad Abdul Haque — ব্যক্তিগত ব্লগ

বাংলা, আরবি (RTL) ও ইংরেজি — তিন ভাষায় লেখার জন্য একটা পরিষ্কার, দ্রুত static ব্লগ।
কোনো build step নেই, কোনো framework নেই — শুধু HTML, CSS, JavaScript।

## ফোল্ডার কাঠামো

```
blog/
├── index.html          # হোমপেজ (লেখার তালিকা + ভাষা ফিল্টার)
├── about.html          # পরিচিতি পেজ
├── posts.js            # সব লেখার তালিকা (manifest) — এখানে নতুন লেখা যোগ করবেন
├── robots.txt
├── assets/
│   ├── style.css       # ডিজাইন (light/dark, বাংলা+আরবি ফন্ট, RTL)
│   └── main.js         # থিম টগল + তালিকা রেন্ডার
└── posts/
    ├── welcome.html            # বাংলা নমুনা
    ├── arabic-reflections.html # আরবি নমুনা (RTL)
    └── on-writing-daily.html   # ইংরেজি নমুনা
```

## নতুন লেখা যোগ করবেন যেভাবে

১. `posts/` ফোল্ডারে আগের যেকোনো একটা পোস্ট কপি করুন
   (বাংলা হলে `welcome.html`, আরবি হলে `arabic-reflections.html`)।
   নতুন নাম দিন, যেমন `posts/my-new-post.html`।

২. ভেতরের শিরোনাম, তারিখ আর লেখা বদলে দিন।
   - **আরবি লেখার জন্য** `<html lang="ar" dir="rtl">` এবং
     `<article class="article lang-ar" lang="ar" dir="rtl">` রাখুন।
   - বাংলা হলে `lang="bn"` / `class="...lang-bn"`, ইংরেজি হলে `lang="en"`।

৩. `posts.js` খুলে তালিকার **শুরুতে** একটা নতুন এন্ট্রি যোগ করুন:

```js
{
  slug: "my-new-post",          // ফাইলের নাম, .html ছাড়া
  title: "আমার নতুন লেখা",
  date: "2026-06-15",           // YYYY-MM-DD (নতুন আগে দেখাবে)
  lang: "bn",                   // "bn" | "ar" | "en"
  excerpt: "ছোট্ট একটা সারমর্ম এখানে।",
  tags: ["ভাবনা"]
},
```

ব্যস — হোমপেজে আপনাআপনি দেখাবে।

## লোকালি দেখা

যেকোনো static server দিয়ে চালান (file:// দিয়েও মোটামুটি চলবে):

```bash
cd blog
python3 -m http.server 8000
# ব্রাউজারে: http://localhost:8000
```

## অনলাইনে প্রকাশ (Netlify)

এই রিপোর Handyman সাইট `docs/` থেকে চলে, তাই ব্লগের জন্য **আলাদা একটা Netlify সাইট** বানান:

1. Netlify → **Add new site → Import an existing project** → এই রিপো বাছুন।
2. **Base directory** ফাঁকা রাখুন, **Publish directory** = `blog` দিন।
3. Deploy চাপুন। চাইলে নিজের পছন্দের সাবডোমেইন/ডোমেইন যুক্ত করুন।

> বিকল্প: GitHub Pages-এ দিতে চাইলে ব্লগটা আলাদা রিপোতে রাখা সবচেয়ে সহজ।

## টুকিটাকি

- **থিম**: উপরের ☾/☀ বোতামে light/dark বদলায়, পছন্দ মনে রাখে।
- **ফন্ট**: বাংলা = Noto Serif Bengali, আরবি = Amiri, ইংরেজি = Source Serif 4
  (Google Fonts থেকে; না এলে সিস্টেম ফন্টে fallback হয়)।
- **রঙ বদলাতে** চাইলে `assets/style.css`-এর উপরের `:root` ভেরিয়েবলগুলো এডিট করুন।
