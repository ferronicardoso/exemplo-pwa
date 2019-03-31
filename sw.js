var CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        'offline',
        'assets/icons/android-icon-512x512.png',
        'assets/icons/android-icon-144x144.png',
        'assets/icons/android-icon-192x192.png',
        'assets/icons/android-icon-256x256.png',
        'assets/icons/android-icon-36x36.png',
        'assets/icons/android-icon-48x48.png',
        'assets/icons/android-icon-72x72.png',
        'assets/icons/android-icon-96x96.png'
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});