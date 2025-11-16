const PRECACHE = 'vida-precache-v1';
const RUNTIME = 'vida-runtime-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './index-mobile.html',
  './news.html',
  './news-detail.html',
  './facilities.html',
  './rooms.html',
  './reservation.html',
  './access.html',
  './faq.html',
  './style.css',
  './mobile-preview.css',
  './scripts/menu.js',
  './scripts/news.js',
  './scripts/news-detail.js',
  './scripts/pwa.js',
  './data/news.json',
  './manifest.webmanifest',
  './img/favicon-32.png',
  './img/favicon-192.png',
  './img/favicon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== PRECACHE && key !== RUNTIME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(RUNTIME).then((cache) =>
        fetch(event.request)
          .then((response) => {
            const clonedResponse = response.clone();
            const url = new URL(event.request.url);
            if (response.ok && url.origin === self.location.origin) {
              cache.put(event.request, clonedResponse);
            }
            return response;
          })
          .catch(() => caches.match('./index.html'))
      );
    })
  );
});
