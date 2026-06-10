/* =========================================================
   Theme toggle + post-list rendering
   ========================================================= */

/* ---- Theme (light/dark, remembers choice) ---- */
(function () {
  const KEY = "blog-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  window.toggleTheme = function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    syncIcon();
  };
  function syncIcon() {
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾";
  }
  document.addEventListener("DOMContentLoaded", syncIcon);
})();

/* ---- Home page: render post list with language filter ---- */
(function () {
  const LANG_LABEL = { bn: "বাংলা", ar: "العربية", en: "English" };
  const LANG_DIR = { bn: "ltr", ar: "rtl", en: "ltr" };
  const READ_MORE = { bn: "পড়ুন", ar: "اقرأ المزيد", en: "Read" };

  function fmtDate(iso, lang) {
    const d = new Date(iso + "T00:00:00");
    const locale = lang === "bn" ? "bn-BD" : lang === "ar" ? "ar" : "en-GB";
    try { return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }); }
    catch (e) { return iso; }
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function render(filter) {
    const list = document.getElementById("post-list");
    if (!list || !window.POSTS) return;

    const posts = window.POSTS.slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .filter((p) => filter === "all" || p.lang === filter);

    if (!posts.length) {
      list.innerHTML = '<li class="empty">এই ভাষায় এখনো কোনো লেখা নেই।</li>';
      return;
    }

    list.innerHTML = posts.map((p) => {
      const dir = LANG_DIR[p.lang] || "ltr";
      const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      const url = `posts/${encodeURIComponent(p.slug)}.html`;
      return `
      <li class="post-item" data-lang="${p.lang}" dir="${dir}">
        <div class="post-meta">
          <span class="badge">${LANG_LABEL[p.lang] || p.lang}</span>
          <span>${fmtDate(p.date, p.lang)}</span>
          ${tags ? `<span class="dot-sep">·</span>${tags}` : ""}
        </div>
        <h2><a href="${url}">${esc(p.title)}</a></h2>
        <p class="excerpt">${esc(p.excerpt || "")}</p>
        <a class="read-more" href="${url}">${READ_MORE[p.lang] || "Read"}</a>
      </li>`;
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("post-list")) return;
    render("all");
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        render(btn.dataset.lang);
      });
    });
  });
})();
