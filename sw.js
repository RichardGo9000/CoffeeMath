//caches files
/* find a more robust way of caching files that doesn't fail if one file is unavailable */
console.log('Service Worker Active');

// 'js/index.js',
self.addEventListener('install', (e) => {
    e.waitUntil(
        //  'js/index.js',
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
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
