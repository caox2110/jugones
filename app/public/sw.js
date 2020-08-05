const version = "1";
const cacheName = `jugones-${version}`;

self.addEventListener('install', e => {
    fetch('/ws-deps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(arrayFiles => {
            e.waitUntil(
                caches.open(cacheName).then(cache => {
                    return cache.addAll(arrayFiles)
                        .then(() => self.skipWaiting());
                })
            );
        })
        .catch(function () {
            this.dataError = true;
        })
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
