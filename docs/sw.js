/* HandyMate Maldives — service worker DISABLED (cache kill-switch).
   The offline cache was serving stale content during active development,
   so this version deletes all caches and unregisters itself. Every request
   now goes straight to the network (always fresh). */
self.addEventListener("install", function () { self.skipWaiting(); });

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (err) {}
    try { await self.registration.unregister(); } catch (err) {}
    try { await self.clients.claim(); } catch (err) {}
  })());
});

/* No fetch handler on purpose → the browser always uses the network. */
