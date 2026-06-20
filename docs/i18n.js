/* ============================================================
   Handyman Maldives — bilingual (English / Dhivehi) engine
   ------------------------------------------------------------
   Owner-provided Dhivehi strings are used where given; the rest
   are a best-effort draft — please review with a native speaker.
   Edit any line here to update the whole site.
   ============================================================ */
(function () {
  const VIBER_NUMBER = "+9607237764";
  const DICT = {
    /* ---- brand ---- */
    "brand.name": { en: "Handyman Maldives", dv: "މޯލްޑިވްސް ހޭންޑީމޭން" },
    "brand.sub":  { en: "Home Repair Services", dv: "ގޭގެ މަރާމާތު ކުރުމުގެ ޚިދުމަތްތައް" },

    /* ---- nav ---- */
    "nav.services":   { en: "Services",  dv: "ޚިދުމަތްތައް" },
    "nav.why":        { en: "Why Us",    dv: "ކީއްވެ އަހަރެމެން" },
    "nav.process":    { en: "Process",   dv: "ކަންހިނގާ ގޮތް" },
    "nav.reviews":    { en: "Reviews",   dv: "ޚިޔާލުތައް" },
    "nav.faq":        { en: "FAQ",       dv: "ސުވާލުތައް" },
    "nav.howitworks": { en: "How it works", dv: "ކަންހިނގާ ގޮތް" },

    /* ---- buttons ---- */
    "btn.book_now":     { en: "Book Now",          dv: "ބުކް ކުރައްވާ" },
    "btn.our_services": { en: "Our Services",      dv: "ޚިދުމަތްތައް" },
    "btn.book_service": { en: "Book Service",      dv: "ބުކް ކުރައްވާ" },
    "btn.book_a_service": { en: "Book a service",  dv: "ޚިދުމަތެއް ބުކް ކުރައްވާ" },
    "btn.chat_wa":      { en: "Chat on WhatsApp",  dv: "ވޮޓްސްއަޕުން ވާހަކަދައްކަވާ" },
    "btn.chat_viber":   { en: "Chat on Viber",     dv: "ވައިބާ އިން ވާހަކަދައްކަވާ" },
    "btn.viber":        { en: "Viber",             dv: "ވައިބާ" },
    "btn.call":         { en: "Call",              dv: "ގުޅުއްވުމަށް" },
    "btn.call_num":     { en: "Call +960 723 7764", dv: "ގުޅުއްވުމަށް +960 723 7764" },
    "btn.whatsapp":     { en: "WhatsApp",          dv: "ވޮޓްސްއަޕް" },

    /* ---- search ---- */
    "search.ph": { en: "Search a service — Moving, AC, plumbing…", dv: "ޚިދުމަތެއް ހޯއްދަވާ — އޭސީ، ފެންވައިރު، ކާޕެންޓްރީ..." },

    /* ---- topbar ---- */
    "topbar.text": { en: "Same-day service across Malé & nearby islands —", dv: "މާލެ އަދި ކައިރި ރަށްތަކަށް އެއްދުވަހުން ޚިދުމަތް —" },
    "topbar.link": { en: "Book on WhatsApp →", dv: "ވޮޓްސްއަޕް އިން ބުކް ކުރައްވާ" },

    /* ---- hero ---- */
    "hero.badge": { en: "Available now · Booking in under 60 seconds", dv: "މިހާރު ލިބެން ހުރި · 60 ސިކުންތުން ބުކް ކުރައްވާ" },
    "hero.h1":    { en: "Your trusted home care partner in the Maldives", dv: "ގޭގެ ހުރިހާ މަރާމާތަކަށް އިތުބާރު ހުރި ޚިދުމަތް" },
    "hero.sub":   { en: "From a full apartment move to a dripping tap — one skilled, reliable team for every home, office and resort job. Fair prices, clean work, done on time.",
                    dv: "އެޕާޓްމަންޓް ބަދަލުކުރުމުން ފެށިގެން އިސްކުރު މަރާމާތު ކުރުމާ ހަމައަށް — ގޭގައާއި، އޮފީހުގައި އަދި ރިސޯޓުތަކުގައި ކުރަންޖެހޭ ކޮންމެ މަސައްކަތަކަށް ސާފުތާހިރު، އަވަސް އަދި އިތުބާރުހުރި ޓީމެއް. ހެޔޮ އަގު، ފުރިހަމަ މަސައްކަތް، ގަޑިއަށް ނިންމުން." },
    "hero.cta_wa": { en: "Book Now", dv: "ވޮޓްސްއަޕް އިން ބުކް ކުރައްވާ" },
    "hero.trust":  { en: "Trusted by homes, offices & resorts", dv: "ގެ، އޮފީސް އަދި ރިޒޯޓްތަކުގެ އިތުބާރު" },
    "hero.rating": { en: "4.9 / 5 rating", dv: "4.9 / 5 ރޭޓިން" },
    "hero.jobs":   { en: "500+ jobs completed", dv: "500+ މަސައްކަތް ނިމިފައި" },
    "hero.guard":  { en: "Work guaranteed", dv: "މަސައްކަތުގެ ޔަގީންކަން" },
    "hero.guardsub": { en: "Insured & vetted pros", dv: "އިންޝުއަރ ކުރެވިފައި" },

    /* ---- trust strip ---- */
    "strip.homes":   { en: "Homes",        dv: "ގެ" },
    "strip.offices": { en: "Offices",      dv: "އޮފީސް" },
    "strip.resorts": { en: "Resorts",      dv: "ރިޒޯޓް" },
    "strip.insured": { en: "Insured Work", dv: "އިންޝުއަރ ކުރެވިފައި" },
    "strip.open":    { en: "Open 7 Days",  dv: "ހަފްތާގެ 7 ދުވަހު" },

    /* ---- services section ---- */
    "sec.whatwedo": { en: "What we do",             dv: "އަޅުގަނޑުމެން ކުރާ ކަންކަން" },
    "sec.svc_h2":   { en: "One team for every fix", dv: "ހުރިހާ މަރާމާތަކަށް އެއް ޓީމު" },
    "sec.svc_lead": { en: "Professional help for homes, apartments, offices and resorts — all under one roof.",
                     dv: "ގެ، އެޕާޓްމަންޓް، އޮފީސް އަދި ރިޒޯޓުތަކަށް ޕްރޮފެޝަނަލް ޚިދުމަތް — ހުރިހާ ކަމެއް އެއް ތަނަކުން." },

    /* ---- service names ---- */
    "svc.moving":     { en: "Apartment Moving",          dv: "ގެދޮރު ބަދަލުކުރުމާއި ތަކެތި އުފުލުން" },
    "svc.aircon":     { en: "Aircon Repair & Servicing", dv: "އޭސީ މަރާމާތުކުރުމާއި ސާވިސްކުރުން" },
    "svc.plumbing":   { en: "Plumbing",                  dv: "ފެންވައިރުކުރުމާއި ފެންލީކުވުން މަރާމާތުކުރުން" },
    "svc.electrical": { en: "Electrical Work",           dv: "ކަރަންޓުގެ މަސައްކަތްތައް" },
    "svc.tiling":     { en: "Tiling",                    dv: "ރޭނުމާއި ޓައިލްޖެހުމުގެ މަސައްކަތް" },
    "svc.painting":   { en: "Painting",                  dv: "ކުލަލުމާއި އާބާތުރަދިފިލުވުން" },
    "svc.roofing":    { en: "Ceiling & Roofing",         dv: "ސީލިން އަދި ފުރާޅުގެ މަސައްކަތް" },
    "svc.carpentry":  { en: "Carpentry",                 dv: "ކާޕެންޓްރީ އަދި ފަރުނީޗަރު ރޭވުން" },
    "svc.general":    { en: "General Repairs",           dv: "އާންމު މަރާމާތު" },
    "svc.paint_tile": { en: "Painting & Tiling",         dv: "ކުލަލުމާއި ޓައިލް ޖެހުން" },

    /* ---- why ---- */
    "why.eyebrow": { en: "Why choose us",                  dv: "ކީއްވެ އަހަރެމެން" },
    "why.h2":      { en: "Reliable work, every single time", dv: "އަހަރެމެން އިޚްތިޔާރު ކުރަންވީ ކީއްވެ؟" },
    "why.lead":    { en: "We treat your space like our own. Here's what sets Handyman Maldives apart.",
                     dv: "ތިޔަބޭފުޅުންގެ ތަން އަމިއްލަ ތަނެއް ފަދައިން ބަލަހައްޓަން. މިއީ އަޅުގަނޑުމެން ޚާއްޞަ ވާ ސަބަބު." },
    "why.f1":  { en: "Fast Response",         dv: "ކުއްލި ހާލަތްތަކުގައި 24/7 ޚިދުމަތް ލިބޭނެ" },
    "why.f1d": { en: "Get a quote within minutes on WhatsApp — not days. Same-day & emergency slots available.",
                 dv: "ވޮޓްސްއަޕުން މިނެޓުތަކެއްގެ ތެރޭގައި އަގެއް ލިބޭ. އެއްދުވަހުން އަދި ކުއްލި ޚިދުމަތްވެސް ލިބޭ." },
    "why.f2":  { en: "Skilled Professionals", dv: "ތަޖުރިބާކާރު ފަންނީ މީހުން" },
    "why.f2d": { en: "Experienced plumbers, electricians, painters & AC technicians you can trust.",
                 dv: "އިތުބާރުކުރެވޭ ތަޖުރިބާކާރު ޕްލަމްބަރުން، ކަރަންޓު މީހުން، ކުލަ ޖަހާ މީހުން އަދި އޭސީ ޓެކްނީޝަނުން." },
    "why.f3":  { en: "Fair, Upfront Pricing", dv: "ހެޔޮ އަގުތަކެއް، ފޮރުވިފައިވާ އިތުރު ޚަރަދެއް ނެތް" },
    "why.f3d": { en: "Clear quotes before we start — no hidden charges, no surprises.",
                 dv: "މަސައްކަތް ފެށުމުގެ ކުރިން ސާފު އަގެއް — ފޮރުވިފައިވާ ޚަރަދެއް ނެތް." },
    "why.f4":  { en: "Clean & Tidy",          dv: "ސާފުތާހިރުކަން" },
    "why.f4d": { en: "We leave your home spotless once the job is done, every time.",
                 dv: "މަސައްކަތް ނިމުމުން ތިޔަބޭފުޅުންގެ ގެ ސާފުކޮށް ބަހައްޓަން، ކޮންމެ ފަހަރަކުވެސް." },
    "why.f5":  { en: "Work Guaranteed",       dv: "މަސައްކަތުގެ ފުރިހަމަ ޔަގީންކަން" },
    "why.f5d": { en: "Not happy with something? We'll come back and make it right.",
                 dv: "ހިތްހަމަ ނުޖެހޭ ކަމެއް އޮތްނަމަ، އެނބުރި އައިސް ރަނގަޅުކޮށްދޭނަން." },
    "why.f6":  { en: "Local & Island-wide",   dv: "%100 ދިވެހި އަދި އިތުބާރުހުރި" },
    "why.f6d": { en: "Based in Malé, serving nearby islands and resorts across the Maldives.",
                 dv: "މާލޭގައި ހުރެ، ކައިރި ރަށްރަށާއި ރިޒޯޓުތަކަށް ޚިދުމަތްދެން." },

    /* ---- stats ---- */
    "stat.s1": { en: "Service categories",  dv: "ޚިދުމަތުގެ ބާވަތް" },
    "stat.s2": { en: "Jobs completed",      dv: "ނިންމި މަސައްކަތް" },
    "stat.s3": { en: "Avg. response time",  dv: "އެވެރެޖް ޚިދުމަތުގެ ވަގުތު" },
    "stat.s4": { en: "Days a week",         dv: "ހަފްތާގެ ދުވަސް" },

    /* ---- process ---- */
    "proc.eyebrow": { en: "How it works",            dv: "ކަންހިނގާ ގޮތް" },
    "proc.h2":      { en: "Booked in 3 simple steps", dv: "3 ފަސޭހަ ފިޔަވަޅުން ބުކް" },
    "proc.lead":    { en: "No apps, no forms, no waiting. Just message us and relax.",
                      dv: "އެޕެއް ނެތް، ފޯމެއް ނެތް، އިންތިޒާރެއް ނެތް. ހަމައެކަނި މެސެޖްކޮށްލާ." },
    "proc.t1":  { en: "Tell us the job", dv: "މަސައްކަތް ބުނެދެއްވާ" },
    "proc.t1d": { en: "Send a WhatsApp with your service, location and a photo if you have one.",
                  dv: "ވޮޓްސްއަޕުން ޚިދުމަތް، ތަން އަދި ފޮޓޮއެއް ހުރިނަމަ ފޮނުއްވާ." },
    "proc.t2":  { en: "Get a quick quote", dv: "އަވަސް އަގެއް ހޯއްދަވާ" },
    "proc.t2d": { en: "We reply fast with a clear price and the earliest available time slot.",
                  dv: "ސާފު އަގަކާއެކު އަވަހަށް ޖަވާބު ދެން، އެންމެ އަވަސް ވަގުތާއެކު." },
    "proc.t3":  { en: "We get it done", dv: "އަޅުގަނޑުމެން ނިންމާލަދެން" },
    "proc.t3d": { en: "Our pro arrives on time, fixes it right, and leaves your space clean.",
                  dv: "ޓެކްނީޝަން ގަޑިއަށް އައިސް، ރަނގަޅަށް ހައްލުކޮށް، ތަން ސާފުކޮށް ބަހައްޓައެވެ." },

    /* ---- reviews ---- */
    "rev.eyebrow": { en: "Happy customers",           dv: "ހިތްހަމަޖެހޭ ކަސްޓަމަރުން" },
    "rev.h2":      { en: "Loved across the Maldives",  dv: "ދިވެހިރާއްޖޭގައި މަޤްބޫލު" },
    "rev.q1":  { en: "\"AC stopped working at night — they came the next morning and fixed it within an hour. Super professional and clean.\"",
                 dv: "\"ރޭގަނޑު އޭސީ ހުއްޓުނު — ޖެހިގެން އައި ހެނދުނު އައިސް ގަޑިއެއްހާއިރުގެ ތެރޭ ހައްލުކޮށްދިން. ވަރަށް ޕްރޮފެޝަނަލް އަދި ސާފު.\"" },
    "rev.q1n": { en: "Aishath R.", dv: "ޢާއިޝަތު ރ." },
    "rev.q1l": { en: "Hulhumalé",  dv: "ހުޅުމާލެ" },
    "rev.q2":  { en: "\"Booked plumbing and painting together. Fair price, great work, and they tidied everything up after. Highly recommend.\"",
                 dv: "\"ޕްލަމްބިން އާއި ކުލަ ޖެހުން އެކުގައި ބުކްކުރިން. ހެޔޮ އަގު، ރަނގަޅު މަސައްކަތް، ނިމުމުން ހުރިހާ އެއްޗެއް ސާފުކޮށްދިން. ވަރަށް ރަނގަޅު.\"" },
    "rev.q2n": { en: "Mohamed H.", dv: "މުޙައްމަދު ހ." },
    "rev.q2l": { en: "Malé",       dv: "މާލެ" },
    "rev.q3":  { en: "\"Whole apartment move handled with real care. Nothing broken, very fast team. Will definitely use them again.\"",
                 dv: "\"މުޅި އެޕާޓްމަންޓް ބަދަލުކުރުން ވަރަށް ފަރުވާތެރިކަމާއެކު ކޮށްދިން. އެއްވެސް އެއްޗެއް ހަލާކެއް ނުވޭ، ވަރަށް އަވަސް ޓީމެއް. އަލުން ބޭނުންކުރާނަން.\"" },
    "rev.q3n": { en: "Sana N.",    dv: "ސަނާ ނ." },
    "rev.q3l": { en: "Vilimalé",   dv: "ވިލިމާލެ" },

    /* ---- faq ---- */
    "faq.eyebrow": { en: "Good to know",              dv: "އެނގުން ރަނގަޅު" },
    "faq.h2":      { en: "Frequently asked questions", dv: "ގިނައިން ކުރެވޭ ސުވާލުތައް" },
    "faq.q1": { en: "Which areas do you cover?", dv: "ކޮން ސަރަޙައްދުތަކަކަށް ޚިދުމަތްދެނީ؟" },
    "faq.a1": { en: "We're based in Malé and serve Hulhumalé, Vilimalé and nearby islands. For resorts and other islands, message us and we'll arrange it.",
                dv: "އަޅުގަނޑުމެން ތިބީ މާލޭގައި، އަދި ހުޅުމާލެ، ވިލިމާލެ އަދި ކައިރި ރަށްރަށަށް ޚިދުމަތްދެން. ރިޒޯޓުތަކާއި އެހެން ރަށްރަށަށް މެސެޖްކޮށްލާ، ހަމަޖައްސައިދޭނަން." },
    "faq.q2": { en: "How fast can you come?", dv: "ކިހާ އަވަހަކަށް އާދެވޭނެ؟" },
    "faq.a2": { en: "For most jobs in the Malé area we offer same-day visits, and we keep slots open for urgent and emergency repairs.",
                dv: "މާލޭ ސަރަޙައްދުގެ ގިނަ މަސައްކަތްތަކަށް އެއްދުވަހުން އާދެވޭ، އަދި ކުއްލި ހާލަތްތަކަށް ޖާގަ ބަހައްޓަން." },
    "faq.q3": { en: "How much do you charge?", dv: "އަގަކީ ކޮބާ؟" },
    "faq.a3": { en: "It depends on the job, but we always give you a clear, upfront quote on WhatsApp before any work begins — no hidden costs.",
                dv: "މަސައްކަތަށް ބަލާފައި، އެކަމަކު މަސައްކަތް ފެށުމުގެ ކުރިން ވޮޓްސްއަޕުން ސާފު އަގެއް އަބަދުވެސް ދެން — ފޮރުވިފައިވާ ޚަރަދެއް ނެތް." },
    "faq.q4": { en: "Can I book more than one service at once?", dv: "އެއްފަހަރާ އެއް ޚިދުމަތަށްވުރެ ގިނައިން ބުކްކުރެވޭނެތަ؟" },
    "faq.a4": { en: "Absolutely. Many customers combine jobs — like plumbing + painting, or AC servicing + electrical. Just list everything in your message.",
                dv: "ޔަޤީނުންވެސް. ގިނަ ކަސްޓަމަރުން މަސައްކަތްތައް އެއްކޮށްލާ — ޕްލަމްބިން + ކުލަ، ނުވަތަ އޭސީ + ކަރަންޓު. މެސެޖުގައި ހުރިހާ އެއްޗެއް ލިޔުއްވާ." },
    "faq.q5": { en: "How do I book?", dv: "ބުކްކުރާނީ ކިހިނެއް؟" },
    "faq.a5": { en: "Simply tap any WhatsApp button on this page, tell us what you need, and we'll handle the rest.",
                dv: "މި ޞަފްޙާގެ ކޮންމެ ވޮޓްސްއަޕް ބަޓަނަކަށް ފިތާލާ، ބޭނުންވާ ކަންތައް ބުނެދެއްވާ، ބާކީ ކަންތައް އަޅުގަނޑުމެން ބަލަހައްޓާނަން." },

    /* ---- cta ---- */
    "cta.h2": { en: "Need it fixed today?", dv: "މިއަދު ހައްލުކުރަން ބޭނުންތަ؟" },
    "cta.p":  { en: "Don't wait around. Message us now and get a quote in minutes.",
                dv: "އިންތިޒާރު ނުކުރައްވާ. މިހާރު މެސެޖްކޮށް މިނެޓުތަކެއްގެ ތެރޭ އަގެއް ހޯއްދަވާ." },

    /* ---- footer ---- */
    "foot.about":     { en: "Your one-stop solution for home, apartment, office and resort maintenance across the Maldives.",
                        dv: "މޯލްޑިވްސް ހޭންޑީމޭން — ގޭގެ ހުރިހާ މަރާމާތަކަށް އެންމެ ފުރިހަމަ އަދި އިތުބާރުހުރި ހައްލު." },
    "foot.services":  { en: "Services",      dv: "ޚިދުމަތްތައް" },
    "foot.areas":     { en: "Service Areas", dv: "ޚިދުމަތްދޭ ސަރަހައްދުތައް" },
    "foot.contact":   { en: "Get in touch",  dv: "އެހީތެރިކަމަށް" },
    "foot.wa":        { en: "WhatsApp us",   dv: "ވޮޓްސްއަޕް ކުރައްވާ" },
    "foot.hours":     { en: "Open 7 days · 8am–11pm", dv: "ހަފްތާގެ 7 ދުވަހު · 8am–11pm" },
    "foot.resorts":   { en: "Resorts & islands", dv: "ރިޒޯޓުތަކާއި ރަށްތައް" },
    "foot.verified":  { en: "Verified & insured local business", dv: "ވެރިފައިޑް އަދި އިންޝުއަރ ކުރެވިފައިވާ ދިވެހި ވިޔަފާރި" },
    "foot.copyright": { en: "Built with care in the Maldives", dv: "ޖުމްލަ ޙައްޤުތައް ހިފެހެއްޓިފައިވެއެވެ." },

    /* ---- drawer ---- */
    "drawer.verify":     { en: "Verified local business · Malé, Maldives", dv: "ވެރިފައިޑް ދިވެހި ވިޔަފާރި · މާލެ، ދިވެހިރާއްޖެ" },
    "drawer.services":   { en: "Our services", dv: "އަޅުގަނޑުމެންގެ ޚިދުމަތް" },
    "drawer.getintouch": { en: "Get in touch", dv: "ގުޅުއްވާ" },
    "drawer.tapcall":    { en: "Tap to call · 7 days a week", dv: "ގުޅުއްވުމަށް ފިތާލާ · ހަފްތާގެ 7 ދުވަހު" },
    "drawer.fastquote":  { en: "Fast quotes & booking", dv: "އަވަސް އަގު އަދި ބުކިން" },
    "drawer.nearby":     { en: "Malé & nearby islands", dv: "މާލެ އާއި ކައިރި ރަށްތައް" },
    "drawer.nearbysub":  { en: "Hulhumalé · Vilimalé · resorts", dv: "ހުޅުމާލެ · ވިލިމާލެ · ރިޒޯޓު" },
    "drawer.openevery":  { en: "Open every day", dv: "ކޮންމެ ދުވަހަކު ހުޅުވިފައި" },
    "drawer.sameday":    { en: "Same-day & emergency slots", dv: "އެއްދުވަހުން އަދި ކުއްލި ޚިދުމަތް" },
    "drawer.guaranteed": { en: "Work guaranteed", dv: "މަސައްކަތުގެ ޔަގީންކަން" },
    "drawer.insured":    { en: "Insured & vetted pros", dv: "އިންޝުއަރ ކުރެވިފައި" },

    /* ============ ORDER PAGE ============ */
    "ord.home":      { en: "Home", dv: "ހޯމް" },
    "ord.step1":     { en: "Choose services", dv: "ޚިދުމަތް އިޚްތިޔާރު ކުރައްވާ" },
    "ord.step2":     { en: "Job details",     dv: "މައްސަލައިގެ ތަފްޞީލް" },
    "ord.step3":     { en: "Your location",   dv: "ރަށް / ތަން" },
    "ord.step4":     { en: "Contact info",    dv: "ގުޅޭނެ ނަންބަރު" },
    "ord.step5":     { en: "Review & send",   dv: "ޔަގީންކުރުން އަދި ފޮނުވުން" },

    "ord.h1_1": { en: "What do you need help with?", dv: "ފުރަތަމަ މަރުހަލާ: ޚިދުމަތް އިޚްތިޔާރު ކުރައްވާ" },
    "ord.h1_2": { en: "Tell us a bit more",          dv: "ދެވަނަ މަރުހަލާ: މައްސަލައިގެ ތަފްޞީލް ލިޔުއްވާ" },
    "ord.h1_3": { en: "Where should we come?",       dv: "ތިންވަނަ މަރުހަލާ: ރަށް އިޚްތިޔާރު ކުރައްވާ" },
    "ord.h1_4": { en: "How can we reach you?",       dv: "ހަތަރުވަނަ މަރުހަލާ: ގުޅޭނެ ނަންބަރު" },
    "ord.h1_5": { en: "Review your order",           dv: "ފަސްވަނަ މަރުހަލާ: ޔަގީންކުރުން އަދި އޯޑަރު ފޮނުވުން" },
    "ord.sub_1": { en: "Pick one or more services — you can combine jobs in a single visit.", dv: "އެއް ނުވަތަ ގިނަ ޚިދުމަތް ހޮއްވަވާ — އެއް ޒިޔާރަތެއްގައި އެކުގައި ކުރެވޭ." },
    "ord.sub_2": { en: "A short description helps us send the right pro and a faster quote.", dv: "ކުރު ތަފްޞީލަކުން ރަނގަޅު ޓެކްނީޝަން އަދި އަވަސް އަގެއް ފޮނުވަން ފަސޭހަވޭ." },
    "ord.sub_3": { en: "We serve Malé, Hulhumalé, Vilimalé and nearby islands & resorts.", dv: "މާލެ، ހުޅުމާލެ، ވިލިމާލެ އަދި ކައިރި ރަށްރަށާއި ރިޒޯޓުތަކަށް ޚިދުމަތްދެން." },
    "ord.sub_4": { en: "We'll send your quote and confirmation on WhatsApp.", dv: "އަގު އަދި ޔަގީންކަން ވޮޓްސްއަޕުން ފޮނުވާނަން." },
    "ord.sub_5": { en: "Quick check, then send it straight to our team on WhatsApp.", dv: "އަވަހަށް ބައްލަވާ، ދެން ސީދާ ޓީމަށް ފޮނުއްވާ." },

    "ord.desc_label":   { en: "Describe the job", dv: "މަސައްކަތް ބަޔާންކުރައްވާ" },
    "ord.optional":     { en: "(optional)",       dv: "(ބޭނުމެއް ނޫން)" },
    "ord.desc_hint":    { en: "Got a photo? You can attach it on WhatsApp after you send the order.", dv: "ފޮޓޮއެއް އެބައޮތްތަ؟ އޯޑަރު ފޮނުވުމަށްފަހު ވޮޓްސްއަޕުން ހިއްޕެވޭ." },
    "ord.urgency":      { en: "How soon do you need it?", dv: "ކިހާ އަވަހަކަށް ބޭނުން؟" },
    "ord.urg_asap":     { en: "As soon as possible", dv: "ވީ އެންމެ އަވަހަކަށް" },
    "ord.urg_asap_sub": { en: "Same-day / urgent",   dv: "މިއަދު / ކުއްލި" },
    "ord.urg_time":     { en: "Pick a time",         dv: "ވަގުތު ހޮއްވަވާ" },
    "ord.urg_time_sub": { en: "Schedule it below",   dv: "ތިރީގައި ކަނޑައަޅުއްވާ" },
    "ord.date":         { en: "Preferred date",      dv: "ތާރީޚް" },
    "ord.time":         { en: "Preferred time",      dv: "ވަގުތު" },
    "ord.island":       { en: "Island / Area",       dv: "ރަށް / ސަރަޙައްދު" },
    "ord.address":      { en: "Address details",     dv: "އެޑްރެސް" },
    "ord.address_tag":  { en: "(building, floor, flat)", dv: "(ޢިމާރާތް، ފްލޯ، ފްލެޓް)" },
    "ord.name":         { en: "Your name",           dv: "ނަން" },
    "ord.phone":        { en: "WhatsApp number",     dv: "ވޮޓްސްއަޕް ނަންބަރު" },
    "ord.phone_hint":   { en: "Local Maldives number is 7 digits. Outside the Maldives? Add the full number in the description.", dv: "ދިވެހި ނަންބަރަކީ 7 އަކުރު. ރާއްޖޭން ބޭރުގައި ނަމަ ތަފްޞީލުގައި ފުރިހަމަ ނަންބަރު ލިޔުއްވާ." },
    "ord.desc_ph":      { en: "Describe your issue here…", dv: "މައްސަލައިގެ ތަފްޞީލް މިތަނުގައި ލިޔުއްވާ..." },
    "ord.phone_ph":     { en: "Enter phone number",  dv: "ފޯނު ނަންބަރު ޖައްސަވާ" },
    "ord.viber_copied": { en: "Order copied — paste it in Viber", dv: "އޯޑަރު ކޮޕީ ކުރެވިއްޖެ — ވައިބާގައި ޕޭސްޓް ކުރައްވާ" },

    "ord.isl_select":    { en: "Select your island…",     dv: "ރަށް ހޮއްވަވާ…" },
    "ord.isl_male":      { en: "Malé",                    dv: "މާލެ" },
    "ord.isl_hulhumale": { en: "Hulhumalé",               dv: "ހުޅުމާލެ" },
    "ord.isl_vilimale":  { en: "Villingili (Vilimalé)",   dv: "ވިލިމާލެ" },
    "ord.isl_hulhule":   { en: "Hulhulé / Airport",       dv: "ހުޅުލެ / އެއާޕޯޓް" },
    "ord.isl_resort":    { en: "A resort island",         dv: "ރިސޯޓް އައިލެންޑް" },
    "ord.isl_other":     { en: "Another island",          dv: "އެހެން ރަށެއް" },

    "ord.continue":      { en: "Continue",             dv: "ކުރިއަށް" },
    "ord.back":          { en: "Back",                 dv: "ފަހަތަށް" },
    "ord.sum_title":     { en: "Order details",        dv: "އޯޑަރުގެ ތަފްޞީލް" },
    "ord.confirm_wa":    { en: "Confirm via WhatsApp",  dv: "ވޮޓްސްއަޕް މެދުވެރިކޮށް އޯޑަރު ޔަގީންކުރައްވާ" },
    "ord.confirm_viber": { en: "Confirm via Viber",     dv: "ވައިބާ މެދުވެރިކޮށް އޯޑަރު ޔަގީންކުރައްވާ" },
    "ord.note":          { en: "By sending, your order opens in WhatsApp or Viber pre-filled — just tap send. No payment is taken online; we quote you first.",
                           dv: "ފޮނުވުމުން، އޯޑަރު ވޮޓްސްއަޕް ނުވަތަ ވައިބާގައި ތައްޔާރަށް ހުޅުވޭ — ހަމައެކަނި ފޮނުވާ. އޮންލައިންކޮށް ފައިސާ ނުނަގަން؛ ފުރަތަމަ އަގު ދެން." },
    "ord.open_wa":       { en: "Open WhatsApp",         dv: "ވޮޓްސްއަޕް ހުޅުވާ" },
    "ord.open_viber":    { en: "Open Viber",            dv: "ވައިބާ ހުޅުވާ" },
    "ord.back_home":     { en: "Back to home",          dv: "ހޯމްއަށް އެނބުރި" },
    "ord.new_order":     { en: "Start a new order",     dv: "އާ އޯޑަރެއް ފައްޓަވާ" },
    "ord.success_h1":    { en: "Order ready!",          dv: "އޯޑަރު ތައްޔާރު!" },
    "ord.success_p":     { en: "WhatsApp should have opened with your order. If it didn't, tap the button below to send it now.",
                           dv: "އޯޑަރާއެކު ވޮޓްސްއަޕް ހުޅުވިފައި ހުންނާނެ. ނުހުޅުވުނުނަމަ، ތިރީގެ ބަޓަނަށް ފިތާ ފޮނުއްވާ." },

    "ord.sum.services": { en: "Services", dv: "ޚިދުމަތް" },
    "ord.sum.details":  { en: "Details",  dv: "ތަފްޞީލް" },
    "ord.sum.timing":   { en: "Timing",   dv: "ވަގުތު" },
    "ord.sum.location": { en: "Location", dv: "ތަން" },
    "ord.sum.contact":  { en: "Contact",  dv: "ގުޅޭ ގޮތް" },
    "ord.sum.edit":     { en: "Edit",     dv: "އެޑިޓް" },
    "ord.sum.nonotes":  { en: "No extra notes", dv: "އިތުރު ނޯޓެއް ނެތް" },
    "ord.brand_sub":    { en: "Book a Service", dv: "ޚިދުމަތެއް ބުކްކުރުން" },
    "ord.desc_hint":    { en: "Got a photo? You can attach it on WhatsApp after you send the order.", dv: "ފޮޓޮއެއް އެބައޮތްތަ؟ އޯޑަރު ފޮނުވުމަށްފަހު ވޮޓްސްއަޕުން ހިއްޕެވޭ." },
    "ord.anytime":   { en: "Any time",            dv: "ކޮންމެ ވަގުތެއް" },
    "ord.morning":   { en: "Morning (8am – 12pm)",   dv: "ހެނދުނު (8am – 12pm)" },
    "ord.afternoon": { en: "Afternoon (12pm – 4pm)", dv: "މެންދުރުފަސް (12pm – 4pm)" },
    "ord.evening":   { en: "Evening (4pm – 8pm)",    dv: "ހަވީރު (4pm – 8pm)" },
    "ord.night":     { en: "Night (after 8pm)",      dv: "ރޭގަނޑު (8pm ފަހުން)" },
    "ord.err_island":  { en: "Please choose your island or area.", dv: "ރަށް ނުވަތަ ސަރަޙައްދު ހޮއްވަވާ." },
    "ord.err_address": { en: "Please add a few address details so we can find you.", dv: "ތަން ހޯދޭނެހެން އެޑްރެސް ލިޔުއްވާ." },
    "ord.err_name":    { en: "Please tell us your name.", dv: "ނަން ޖައްސަވާ." },
    "ord.err_phone":   { en: "Enter a valid Maldivian number (7 digits).", dv: "ރަނގަޅު ދިވެހި ނަންބަރެއް (7 އަކުރު) ޖައްސަވާ." }
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
    viberNumber: VIBER_NUMBER,
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
