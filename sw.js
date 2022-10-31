//caches files

console.log('Service Worker Active');

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('CoffeeCache').then((cache) => cache.addAll([
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


self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});



// https://web.dev/learn/pwa/serving/

// https://www.thecodeship.com/web-development/guide-service-worker-pitfalls-best-practices/

// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663

// https://developer.chrome.com/docs/workbox/caching-strategies-overview/
