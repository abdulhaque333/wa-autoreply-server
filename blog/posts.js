/* =========================================================
   POSTS MANIFEST — single source of truth
   ---------------------------------------------------------
   নতুন লেখা যোগ করতে:
   1) posts/ ফোল্ডারে একটি .html ফাইল বানান (পুরোনো পোস্ট কপি করে)।
   2) নিচের অ্যারের শুরুতে একটি নতুন অবজেক্ট যোগ করুন।
   3) `python3 generate.py` চালান — sitemap.xml ও feed.xml আপডেট হবে।

   ফিল্ড:  slug · title · date(YYYY-MM-DD) · lang(bn|ar|en) · excerpt · tags[]
   দ্রষ্টব্য: নিচের অ্যারেটি বৈধ JSON — generate.py এটি সরাসরি পড়ে।
   ========================================================= */

window.POSTS =
[
  {
    "slug": "ibn-taymiyyah-kashmiri-objections",
    "title": "শাইখুল ইসলাম ইবনু তাইমিয়া রাহ.-এর ওপর আল্লামাহ কাশ্মিরি রাহ.-এর দুটি বড় অভিযোগ ও আমাদের জবাব",
    "date": "2026-06-10",
    "lang": "bn",
    "excerpt": "ইবনু তাইমিয়া রাহ.-এর ওপর আনা ‘দিক’ ও ‘নুযুল’ সংক্রান্ত দুটি বড় অভিযোগ এবং দলিলভিত্তিক জবাব।",
    "tags": ["আকিদাহ", "ইবনু তাইমিয়া"]
  },
  {
    "slug": "arabic-reflections",
    "title": "في فضل طلب العلم",
    "date": "2026-06-08",
    "lang": "ar",
    "excerpt": "خواطر قصيرة حول قيمة العلم والصبر في طريق طلبه.",
    "tags": ["العلم", "تأملات"]
  },
  {
    "slug": "on-writing-daily",
    "title": "On the Habit of Writing Daily",
    "date": "2026-06-05",
    "lang": "en",
    "excerpt": "A short note on why writing a little every day quietly changes how you think.",
    "tags": ["writing", "habits"]
  }
]
;
