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

//Begin original faulty fetch event listener
/*
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
*/

//Begin first fetch request intercept replacement idea
// This implementation is glitchy and does not fully work
/*
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response),
    );
});
*/
//End first fetch request intercept replacement idea


//service worker examples
// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663

//The following example if from https://www.thecodeship.com/web-development/guide-service-worker-pitfalls-best-practices/
/*
console.log('setting fetch event listener');
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.open(CoffeeCache).then((CACHE) => {
            return cache.match(e.request).then((response) => {
                cache.put(e.request, response.clone());
                    return response;
                })//;
            });
        })
    );
});
*/


// The following is an example from https://web.dev/learn/pwa/serving/
self.addEventListener("fetch", event => {
   event.respondWith(
     caches.match(event.request).then(cachedResponse => {
         const networkFetch = fetch(event.request).then(response => {
           // update the cache with a clone of the network response
           caches.open("CoffeeCache").then(cache => {
               cache.put(event.request, response.clone());
           });
         });
         // prioritize cached response over network
         return cachedResponse || networkFetch;
     }
   )
  )
});
