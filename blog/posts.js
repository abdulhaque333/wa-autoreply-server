/* =========================================================
   POSTS MANIFEST
   ---------------------------------------------------------
   নতুন লেখা যোগ করতে:
   1) blog/posts/ ফোল্ডারে নতুন একটি .html ফাইল বানান
      (যেকোনো বিদ্যমান পোস্ট কপি করে শুরু করুন)।
   2) নিচের তালিকার শুরুতে একটি নতুন অবজেক্ট যোগ করুন।

   ফিল্ডসমূহ:
     slug    – পোস্ট ফাইলের নাম (posts/ ছাড়া)
     title   – শিরোনাম
     date    – "YYYY-MM-DD" (নতুন আগে দেখাবে)
     lang    – "bn" | "ar" | "en"
     excerpt – ছোট সারমর্ম (তালিকায় দেখাবে)
     tags    – বিষয় ট্যাগ (অ্যারে)
   ========================================================= */

window.POSTS = [
  {
    slug: "welcome",
    title: "শুরুর কথা: কেন এই ব্লগ",
    date: "2026-06-10",
    lang: "bn",
    excerpt: "ভাবনা, বই, বিশ্বাস আর প্রতিদিনের জীবন নিয়ে লেখালেখির একটা ঘর — এখান থেকেই যাত্রা শুরু।",
    tags: ["ব্যক্তিগত", "ভাবনা"]
  },
  {
    slug: "arabic-reflections",
    title: "في فضل طلب العلم",
    date: "2026-06-08",
    lang: "ar",
    excerpt: "خواطر قصيرة حول قيمة العلم والصبر في طريق طلبه.",
    tags: ["العلم", "تأملات"]
  },
  {
    slug: "on-writing-daily",
    title: "On the Habit of Writing Daily",
    date: "2026-06-05",
    lang: "en",
    excerpt: "A short note on why writing a little every day quietly changes how you think.",
    tags: ["writing", "habits"]
  }
];
