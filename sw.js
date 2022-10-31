//caches files

console.log('Service Worker Active');
const cacheName = "CoffeeCahe";

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll([
            'index.html',
            'index.js',
            'css/style.css',
            'img/CM-192.png',
            'img/CM-512.png',
            'img/gear.png',
            'js/Quiz.js',
            'js/Problem.js',
            'js/problems/Addition.js',
            'js/problems/Subtraction.js',
            'js/problems/Multiplication.js',
            'js/problems/Division.js',
            'js/problems/Factorial.js',
            'js/problems/Percentage.js',
            'js/problems/Exponent.js',
            'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js', //not sure if this line is necessary
        ])), 
    );
});


/*
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
*/

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.open(cacheName).then((cache) => {
        return cache.match(event.request.url).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((fetchedResponse => {
                cache.put(event.request, fetchedResponse.clone());
                return fetchedResponse;
            }));
        });
    }));
});


// https://developer.chrome.com/docs/workbox/caching-strategies-overview/

//   https://web.dev/learn/pwa/serving/
//   https://www.thecodeship.com/web-development/guide-service-worker-pitfalls-best-practices/
//   https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663

