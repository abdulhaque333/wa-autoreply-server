/* =========================================================
   CATEGORIES + POSTS — single source of truth
   ---------------------------------------------------------
   নতুন ক্যাটাগরি যোগ করতে: নিচের CATEGORIES তালিকায় একটি অবজেক্ট যোগ করুন—
     slug  = ইংরেজি আইডি (URL/ফিল্টারে ব্যবহৃত, ফাঁকা স্পেস নয়)
     name  = পূর্ণ নাম (ফিল্টার করলে উপরে শিরোনামে দেখাবে)
     short = পিল/বোতামে দেখানোর সংক্ষিপ্ত নাম

   নতুন লেখা যোগ করতে: posts/ এ একটি .html বানিয়ে POSTS তালিকার শুরুতে এন্ট্রি দিন।
     slug · title · date(YYYY-MM-DD) · lang(bn|ar|en) · category(উপরের slug) · excerpt · tags[]
   এরপর `python3 generate.py` চালান।
   ========================================================= */

window.CATEGORIES =
[
  { "slug": "akidah",                "name": "আকিদাহ",                                                  "short": "আকিদাহ" },
  { "slug": "fiqh",                  "name": "ফিকহ",                                                    "short": "ফিকহ" },
  { "slug": "tafsir",                "name": "তাফসির",                                                  "short": "তাফসির" },
  { "slug": "usul-fiqh",             "name": "উসূলে ফিকহ",                                              "short": "উসূলে ফিকহ" },
  { "slug": "ulum-hadith",           "name": "উলূমুল হাদিস",                                            "short": "উলূমুল হাদিস" },
  { "slug": "ibn-taymiyyah-defense", "name": "ইবনু তাইমিয়া রাহ.-এর ওপর আরোপিত অভিযোগের জবাব",          "short": "ইবনু তাইমিয়া রাহ." },
  { "slug": "muawiyah-defense",      "name": "আমিরে মুয়াবিয়া রা.-এর ওপর আরোপিত অভিযোগের জবাব",          "short": "আমিরে মুয়াবিয়া রা." }
];

window.POSTS =
[
  {
    "slug": "ibn-taymiyyah-kashmiri-objections",
    "title": "শাইখুল ইসলাম ইবনু তাইমিয়া রাহ.-এর ওপর আল্লামাহ কাশ্মিরি রাহ.-এর দুটি বড় অভিযোগ ও আমাদের জবাব",
    "date": "2026-06-10",
    "lang": "bn",
    "category": "ibn-taymiyyah-defense",
    "excerpt": "ইবনু তাইমিয়া রাহ.-এর ওপর আনা ‘দিক’ ও ‘নুযুল’ সংক্রান্ত দুটি বড় অভিযোগ এবং দলিলভিত্তিক জবাব।",
    "tags": ["আকিদাহ", "ইবনু তাইমিয়া"]
  },
  {
    "slug": "arabic-reflections",
    "title": "في فضل طلب العلم",
    "date": "2026-06-08",
    "lang": "ar",
    "category": "",
    "excerpt": "خواطر قصيرة حول قيمة العلم والصبر في طريق طلبه.",
    "tags": ["العلم", "تأملات"]
  },
  {
    "slug": "on-writing-daily",
    "title": "On the Habit of Writing Daily",
    "date": "2026-06-05",
    "lang": "en",
    "category": "",
    "excerpt": "A short note on why writing a little every day quietly changes how you think.",
    "tags": ["writing", "habits"]
  }
]
;
