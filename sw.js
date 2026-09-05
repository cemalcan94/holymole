// HolyMole SW — AĞ-ÖNCELİKLİ: önbellek yalnız çevrimdışı yedek.
// (stale-while-revalidate KULLANMA: sürüm karışması boş ekrana yol açar — Matcez dersi)
const CACHE = "holymole-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
