const CACHE_NAME = 'eventos-chiapas-v1';
const APP_SHELL = [
    'index.html',
    'eventos.html',
    'contacto.html',
    'manifest.json',
    'css/style.css',
    'js/script.js',
    'img/Consejos-para-Disenar-el-Escenario-de-un-Evento.jpg',
    'img/evento-similar-1.jpg',
    'img/evento-similar-2.jpg',
    'img/evento-similar-3.jpg',
    'img/evento-similar-4.jpg',
    'img/evento-similar-5.jpg',
    'img/evento-similar-6.jpg',
    'img/icon-192.png',
    'img/icon-512.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(APP_SHELL);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(cacheNames
                    .filter(function (cacheName) {
                        return cacheName.startsWith('eventos-chiapas-') && cacheName !== CACHE_NAME;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    }));
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', function (event) {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .catch(function () {
                    return caches.match(request, { ignoreSearch: true })
                        .then(function (cachedPage) {
                            return cachedPage || caches.match('index.html');
                        });
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(function (cachedResponse) {
                if (cachedResponse) return cachedResponse;

                return fetch(request);
            })
    );
});
