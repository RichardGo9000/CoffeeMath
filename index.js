// Main Web App
//*************

console.log('Javascript Active');

// Settings


// Present Quiz

import Quiz from './js/Quiz.js';

console.log("Calling Quiz()");
new Quiz().init();

// (() => {
//     //calling Quiz();
//     console.log("Calling Quiz()");
//     new Quiz().init();
// });



//PWA Functionality
//*****************

// registers service worker
if ('serviceWorker' in navigator) {
    //            '../sw.js'
    navigator.serviceWorker
        .register('sw.js')
        .then(() => {
            console.log('Service worker registered');
        });
}

// handle install prompt
let deferredPrompt;
const addBtn = document.querySelector('.installBtn');//refactor to install button
// add function to check install checkbox when installed and uncheck checkbox when not installed
// addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    //prevent chrom 67 & earlier from automatically showing prompt
    e.preventDefault();
    //stash the event so it can be triggered later
    deferredPrompt = e;
    // addBtn.style.display = 'block';
    addBtn.addEventListener('click', () => {
        // addBtn.style.display = 'none';
        //show the prompt
        deferredPrompt.prompt();
        //wait for user to decide
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted A2HS prompt');
            } else {
                console.log('User dismissied A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
