// Main Web App
//*************

console.log('Javascript Active');




// Present Quiz
import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';
import Quiz from './js/Quiz.js';

console.log("Calling Quiz()");
new Quiz().init();

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

// Handle Install Prompt
let deferredPrompt;
const addBtn = document.querySelector('.installBtn');//refactor to install button

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


// Set up Settings DB
const dataLayer = async() => {
    const coffeeDB = "CoffeeMathDB";

    localforage.setItem('updateLevel', 0);

    let updateLevel = null;
    updateLevel = await localforage.getItem('updateLevel');
    console.log("Update Level: " + updateLevel);
}

//IIFE
(async() => {
    await dataLayer()
})()
