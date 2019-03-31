// Cache on install
var staticCacheName = 'exemplo_pwa_2019_02_16_20_13'
this.addEventListener("install", event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll([
                    'offline',
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

// Clear cache on activate
this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith('exemplo_pwa_')))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
this.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/offline');
            })
    )
});