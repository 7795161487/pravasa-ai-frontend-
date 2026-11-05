const CACHE_NAME = 'pravasa-v1';
const STATIC_ASSETS = ['/', '/index.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS))); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.destination === 'image' || url.pathname.startsWith('/assets/')) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
