//caches files

console.log('Service Worker Active');  //alert developer that service worker is active

self.addEventListener('install', (e) => {  //tell javascript to run this code whe the install event is fired
    e.waitUntil(  //tell event to wait until the files are cached
        caches.open('CoffeeCache').then((cache) => cache.addAll([  //create a new cache named coffeemath the add the following files to that cahce
            'index.html',  //cache index.html first 
            'index.js',    //get the main js file next
            'css/style.css', //cache out stylesheet
            'img/CM-192.png',  //cache small icon
            'img/CM-512.png',  //cache large icon
            'img/gear.png',  //cache settting icon
            'js/Quiz.js',  //store the quizjs file
            'js/Problem.js', //store the problem class
            'js/problems/Addition.js',  //store the code behind addition topic
            'js/problems/Subtraction.js',  //store the code behind subtraction tpoic
            'js/problems/Multiplication.js',  //store code behind multiplication topic
            'js/problems/Division.js',  //store code behind division topic
            'js/problems/Factorial.js',  //store code behind factorial problems
            'js/problems/Percentage.js', //store code behind percentage problems
            'js/problems/Exponent.js',  //store code behind exponent problems
            'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js', //chache the localforage lib
        ])), //close the caches.open command
    );  //close the e.waitUntil command 
});  //close the codeblock to install pwa

self.addEventListener('fetch', (e) => {  //add event listener to look for files being fetched from the network, check cache first
    console.log(e.request.url);  //log that files are being fetched from cache
    e.respondWith(  //respond to event with following code block
        caches.match(e.request).then((response) => response || fetch(e.request)),  //send files from cache or get them from network if not already saved
    );//close e.resppondWith
});//close self.addEventListener
