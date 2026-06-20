/* Handyman Maldives — service worker (offline-ready app shell) */
/* Relative URLs so it works both at a domain root (Netlify) and a
   project subpath (GitHub Pages). They resolve against this script's URL. */
const CACHE = "hm-app-v6";
const ASSETS = [
  "./",
  "index.html",
  "order.html",
  "manifest.webmanifest",
  "logo.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never cache cross-origin (fonts, WhatsApp) — go straight to network.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cached app shell when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match("order.html")))
    );
    return;
  }

  // Always fetch fresh JS (e.g. i18n.js translations); fall back to cache offline.
  if (url.pathname.endsWith(".js")) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Static assets: cache-first, then network (and cache it).
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached)
    )
  );
});
