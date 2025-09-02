const CACHE_NAME = 'prayer-times-cache-v1';
const urlsToCache = [
  './prayer_app.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo&display=swap',
  'https://cdn.islamic.network/media/audio/adhan/makkah_murattal.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
