/* ============================================================
   Handyman Maldives — bilingual (English / Dhivehi) engine
   ------------------------------------------------------------
   ⚠️  The Dhivehi (ދިވެހި) strings below are a best-effort draft.
       Please have a native speaker review & correct them — you
       can edit any line here and it updates the whole site.
   ============================================================ */
(function () {
  const DICT = {
    /* ---- nav / global ---- */
    "nav.services":   { en: "Services",  dv: "ޚިދުމަތްތައް" },
    "nav.why":        { en: "Why Us",    dv: "ކީއްވެ އަހަރެމެން" },
    "nav.process":    { en: "Process",   dv: "ކަންހިނގާ ގޮތް" },
    "nav.reviews":    { en: "Reviews",   dv: "ރިވިއުތައް" },
    "nav.faq":        { en: "FAQ",       dv: "ސުވާލުތައް" },
    "nav.howitworks": { en: "How it works", dv: "ކަންހިނގާ ގޮތް" },

    /* ---- buttons ---- */
    "btn.book_now":     { en: "Book Now",          dv: "ބުކް ކުރައްވާ" },
    "btn.our_services": { en: "Our Services",      dv: "ޚިދުމަތްތައް ބައްލަވާ" },
    "btn.book_service": { en: "Book Service",      dv: "ބުކް ކުރައްވާ" },
    "btn.book_a_service": { en: "Book a service",  dv: "ޚިދުމަތެއް ބުކް ކުރައްވާ" },
    "btn.chat_wa":      { en: "Chat on WhatsApp",  dv: "ވަޓްސްއެޕުން ވާހަކަދައްކަވާ" },
    "btn.call":         { en: "Call",              dv: "ގުޅުއްވާ" },
    "btn.call_num":     { en: "Call +960 723 7764", dv: "ގުޅުއްވާ +960 723 7764" },
    "btn.whatsapp":     { en: "WhatsApp",          dv: "ވަޓްސްއެޕް" },
    "btn.lang":         { en: "ދިވެހި",            dv: "English" },

    /* ---- search ---- */
    "search.ph": { en: "Search a service — Moving, AC, plumbing…", dv: "ޚިދުމަތެއް ހޯއްދަވާ — މޫވިން، އޭސީ، ޕްލަމްބިން…" },

    /* ---- hero ---- */
    "hero.badge": { en: "Available now · Booking in under 60 seconds", dv: "މިހާރު ލިބެން ހުރި · 60 ސިކުންތުން ބުކް ކުރައްވާ" },
    "hero.h1":    { en: "Your trusted home care partner in the Maldives", dv: "ދިވެހިރާއްޖޭގައި ތިޔަބޭފުޅުންގެ އިތުބާރުހުރި ގޭގެ މަރާމާތު ޚިދުމަތް" },
    "hero.trust": { en: "Trusted by homes, offices & resorts", dv: "ގެ، އޮފީސް އަދި ރިޒޯޓްތަކުގެ އިތުބާރު" },

    /* ---- trust strip ---- */
    "strip.homes":   { en: "Homes",        dv: "ގެ" },
    "strip.offices": { en: "Offices",      dv: "އޮފީސް" },
    "strip.resorts": { en: "Resorts",      dv: "ރިޒޯޓް" },
    "strip.insured": { en: "Insured Work", dv: "އިންޝުއަރ ކުރެވިފައި" },
    "strip.open":    { en: "Open 7 Days",  dv: "ހަފްތާގެ 7 ދުވަހު" },

    /* ---- services section ---- */
    "sec.whatwedo": { en: "What we do",          dv: "އަޅުގަނޑުމެން ކުރާ ކަންކަން" },
    "sec.svc_h2":   { en: "One team for every fix", dv: "ހުރިހާ މަރާމާތަކަށް އެއް ޓީމު" },

    /* ---- service names ---- */
    "svc.moving":     { en: "Apartment Moving",          dv: "އެޕާޓްމަންޓް މޫވިން" },
    "svc.aircon":     { en: "Aircon Repair & Servicing", dv: "އޭސީ މަރާމާތާއި ސާވިސް" },
    "svc.aircon_s":   { en: "Aircon Service",            dv: "އޭސީ ސާވިސް" },
    "svc.plumbing":   { en: "Plumbing",                  dv: "ޕްލަމްބިން" },
    "svc.electrical": { en: "Electrical Work",           dv: "ކަރަންޓް މަސައްކަތް" },
    "svc.tiling":     { en: "Tiling",                    dv: "ޓައިލް ޖެހުން" },
    "svc.painting":   { en: "Painting",                  dv: "ކުލަ ލުން" },
    "svc.roofing":    { en: "Ceiling & Roofing",         dv: "ސީލިން އަދި ރޫފިން" },
    "svc.carpentry":  { en: "Carpentry",                 dv: "ވަޑާން" },
    "svc.general":    { en: "General Repairs",           dv: "އާންމު މަރާމާތު" },

    /* ---- why ---- */
    "why.eyebrow": { en: "Why choose us",                 dv: "ކީއްވެ އަޅުގަނޑުމެން" },
    "why.h2":      { en: "Reliable work, every single time", dv: "ކޮންމެ ފަހަރަކުވެސް އިތުބާރުހުރި މަސައްކަތް" },
    "why.f1":      { en: "Fast Response",        dv: "އަވަސް ޚިދުމަތް" },
    "why.f2":      { en: "Skilled Professionals", dv: "ތަޖުރިބާކާރު މީހުން" },
    "why.f3":      { en: "Fair, Upfront Pricing", dv: "އިންސާފުވެރި އަގު" },
    "why.f4":      { en: "Clean & Tidy",          dv: "ސާފުތާހިރު" },
    "why.f5":      { en: "Work Guaranteed",       dv: "މަސައްކަތުގެ ޔަޤީންކަން" },
    "why.f6":      { en: "Local & Island-wide",   dv: "ލޯކަލް އަދި ރަށްރަށުގައި" },

    /* ---- stats ---- */
    "stat.s1": { en: "Service categories",  dv: "ޚިދުމަތުގެ ބާވަތް" },
    "stat.s2": { en: "Jobs completed",      dv: "ނިންމި މަސައްކަތް" },
    "stat.s3": { en: "Avg. response time",  dv: "އެވެރެޖް ޚިދުމަތުގެ ވަގުތު" },
    "stat.s4": { en: "Days a week",         dv: "ހަފްތާގެ ދުވަސް" },

    /* ---- process ---- */
    "proc.eyebrow": { en: "How it works",          dv: "ކަންހިނގާ ގޮތް" },
    "proc.h2":      { en: "Booked in 3 simple steps", dv: "3 ފަސޭހަ ފިޔަވަޅުން ބުކް" },
    "proc.t1":      { en: "Tell us the job",       dv: "މަސައްކަތް ބުނެދެއްވާ" },
    "proc.t2":      { en: "Get a quick quote",     dv: "އަވަސް އަގެއް ހޯއްދަވާ" },
    "proc.t3":      { en: "We get it done",        dv: "އަޅުގަނޑުމެން ނިންމާލަދެން" },

    /* ---- reviews / faq / cta ---- */
    "rev.eyebrow": { en: "Happy customers",       dv: "ހިތްހަމަޖެހޭ ކަސްޓަމަރުން" },
    "rev.h2":      { en: "Loved across the Maldives", dv: "ދިވެހިރާއްޖޭގައި މަޤްބޫލު" },
    "faq.eyebrow": { en: "Good to know",          dv: "އެނގުން ރަނގަޅު" },
    "faq.h2":      { en: "Frequently asked questions", dv: "ގިނައިން ކުރެވޭ ސުވާލުތައް" },
    "cta.h2":      { en: "Need it fixed today?",  dv: "މިއަދު ހައްލުކުރަން ބޭނުންތަ؟" },

    /* ---- footer ---- */
    "foot.services": { en: "Services",      dv: "ޚިދުމަތްތައް" },
    "foot.areas":    { en: "Service Areas", dv: "ޚިދުމަތްދޭ ސަރަޙައްދު" },
    "foot.contact":  { en: "Get in touch",  dv: "ގުޅުއްވާ" },
    "foot.wa":       { en: "WhatsApp us",   dv: "ވަޓްސްއެޕް ކުރައްވާ" },

    /* ---- drawer ---- */
    "drawer.services": { en: "Our services", dv: "އަޅުގަނޑުމެންގެ ޚިދުމަތް" },
    "drawer.getintouch": { en: "Get in touch", dv: "ގުޅުއްވާ" },

    /* ============ ORDER PAGE ============ */
    "ord.home":      { en: "Home", dv: "ހޯމް" },
    "ord.step1":     { en: "Choose services", dv: "ޚިދުމަތް ހޮއްވަވާ" },
    "ord.step2":     { en: "Job details",     dv: "ތަފްޞީލް" },
    "ord.step3":     { en: "Your location",   dv: "ތަން" },
    "ord.step4":     { en: "Contact info",    dv: "ގުޅޭނެ ގޮތް" },
    "ord.step5":     { en: "Review & send",   dv: "ބައްލަވާ އަދި ފޮނުވާ" },
    "ord.step_of":   { en: "Step",            dv: "ފިޔަވަޅު" },
    "ord.of":        { en: "of",              dv: "/" },

    "ord.h1_1": { en: "What do you need help with?", dv: "ކޮން ކަމަކަށް އެހީ ބޭނުންތަ؟" },
    "ord.h1_2": { en: "Tell us a bit more",          dv: "އިތުރު ތަފްޞީލް ދެއްވާ" },
    "ord.h1_3": { en: "Where should we come?",       dv: "ކޮންތަނަކަށް އަންނަންވީ؟" },
    "ord.h1_4": { en: "How can we reach you?",       dv: "ކިހިނެއް ގުޅޭނީ؟" },
    "ord.h1_5": { en: "Review your order",           dv: "އޯޑަރު ބައްލަވާ" },

    "ord.desc_label":   { en: "Describe the job", dv: "މަސައްކަތް ބަޔާންކުރައްވާ" },
    "ord.optional":     { en: "(optional)",       dv: "(ބޭނުމެއް ނޫން)" },
    "ord.urgency":      { en: "How soon do you need it?", dv: "ކިހާ އަވަހަކަށް ބޭނުން؟" },
    "ord.urg_asap":     { en: "As soon as possible", dv: "ވީ އެންމެ އަވަހަކަށް" },
    "ord.urg_asap_sub": { en: "Same-day / urgent",   dv: "މިއަދު / އަވަސް" },
    "ord.urg_time":     { en: "Pick a time",         dv: "ވަގުތު ހޮއްވަވާ" },
    "ord.urg_time_sub": { en: "Schedule it below",   dv: "ތިރީގައި ކަނޑައަޅުއްވާ" },
    "ord.date":         { en: "Preferred date",      dv: "ތާރީޚް" },
    "ord.time":         { en: "Preferred time",      dv: "ވަގުތު" },
    "ord.island":       { en: "Island / Area",       dv: "ރަށް / ސަރަޙައްދު" },
    "ord.address":      { en: "Address details",     dv: "އެޑްރެސް" },
    "ord.address_tag":  { en: "(building, floor, flat)", dv: "(ޢިމާރާތް، ފްލޯ، ފްލެޓް)" },
    "ord.name":         { en: "Your name",           dv: "ނަން" },
    "ord.phone":        { en: "WhatsApp number",     dv: "ވަޓްސްއެޕް ނަންބަރު" },

    "ord.continue":   { en: "Continue",            dv: "ކުރިއަށް" },
    "ord.confirm_wa": { en: "Confirm via WhatsApp", dv: "ވަޓްސްއެޕުން ޔަޤީންކުރައްވާ" },
    "ord.open_wa":    { en: "Open WhatsApp",        dv: "ވަޓްސްއެޕް ހުޅުވާ" },
    "ord.back_home":  { en: "Back to home",         dv: "ހޯމްއަށް އެނބުރި" },
    "ord.new_order":  { en: "Start a new order",    dv: "އާ އޯޑަރެއް ފައްޓަވާ" },
    "ord.success_h1": { en: "Order ready!",         dv: "އޯޑަރު ތައްޔާރު!" },

    "ord.sum.services": { en: "Services", dv: "ޚިދުމަތް" },
    "ord.sum.details":  { en: "Details",  dv: "ތަފްޞީލް" },
    "ord.sum.timing":   { en: "Timing",   dv: "ވަގުތު" },
    "ord.sum.location": { en: "Location", dv: "ތަން" },
    "ord.sum.contact":  { en: "Contact",  dv: "ގުޅޭ ގޮތް" },
    "ord.sum.edit":     { en: "Edit",     dv: "އެޑިޓް" }
  };

  const RTL_LANG = "dv";

  function detect() {
    try {
      const saved = localStorage.getItem("hm_lang");
      if (saved === "en" || saved === "dv") return saved;
    } catch (e) {}
    const n = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return n.indexOf("dv") === 0 ? "dv" : "en";
  }

  let lang = detect();

  function t(key) {
    const e = DICT[key];
    if (!e) return null;
    return (e[lang] != null) ? e[lang] : e.en;
  }

  function apply() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = (lang === RTL_LANG) ? "rtl" : "ltr";
    html.classList.toggle("lang-dv", lang === RTL_LANG);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const v = t(el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      const v = t(el.getAttribute("data-i18n-ph"));
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const v = t(el.getAttribute("data-i18n-aria"));
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.textContent = (lang === "dv") ? "English" : "ދިވެހި";
    });

    if (typeof window.onLangChange === "function") {
      try { window.onLangChange(lang); } catch (e) {}
    }
  }

  window.i18n = {
    get lang() { return lang; },
    t: t,
    set: function (l) {
      lang = (l === "dv") ? "dv" : "en";
      try { localStorage.setItem("hm_lang", lang); } catch (e) {}
      apply();
    },
    toggle: function () { this.set(lang === "dv" ? "en" : "dv"); },
    apply: apply
  };

  document.addEventListener("click", function (e) {
    const b = e.target.closest("[data-lang-toggle]");
    if (b) { e.preventDefault(); window.i18n.toggle(); }
  });

  if (document.readyState !== "loading") apply();
  else document.addEventListener("DOMContentLoaded", apply);
})();
