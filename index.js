import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';
import Quiz from './js/Quiz.js';

// Main Web App
//*************

// Present Quiz

console.log("Calling Quiz()");
new Quiz().init();


function enablePWAFunctionality() {
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
    const addBtn = document.querySelector('.installBtn'); //refactor to install button

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
}
enablePWAFunctionality();

// Set up Settings DB
const dataLayer = async () => {

        const initDB = async () => {
            const coffeeDB = "CoffeeMathDB";
            localforage.config({
                name: 'CoffeeMath',
                storeName: 'CoffeeMathSettings'
            });
        }
        //IIFE
        (async () => {
            await initDB()
        })()

        let appUpdateLevel = await localforage.getItem('appUpdateLevel');
        console.log('Update Level: ' + appUpdateLevel);

        if (appUpdateLevel == null) {
            const saveDefaultSettings = async () => {
                localforage.setItem('appUpdateLevel', 50);
                localforage.setItem('topicAddition', true);
                localforage.setItem('topicSubtraction', true);
                localforage.setItem('topicMultiplication', true);
                localforage.setItem('topicDivision', true);
                localforage.setItem('topicFactorial', false);
                localforage.setItem('topicPercentage', false);
                localforage.setItem('topicExponent', false);
                localforage.setItem('topicNegatives', false);
                localforage.setItem('topicFractions', false);
                localforage.setItem('topicDecimals', false);
                localforage.setItem('topicLogarithms', false);
            }
            //IIFE
            (async () => {
                await saveDefaultSettings()
            })()
        } else {
            (async () => {
                await getSettingsFromDB()
            })()
        }


    }
    (async () => {
        await dataLayer()
    })()

// Listen for settings menu changes
function addMenuEventListeners() {


    //Addition
    document.getElementById('topicAddition').addEventListener('click', (e) => {
        console.log('Addition ' + e);
        localforage.setItem('topicAddition', document.getElementById('topicAddition').checked);
    });
    //Subtraction
    document.getElementById('topicSubtraction').addEventListener('click', (e) => {
        console.log('Subtraction ' + e);
        localforage.setItem('topicSubtraction', document.getElementById('topicSubtraction').checked);
    });
    //Division
    document.getElementById('topicDivision').addEventListener('click', (e) => {
        console.log('Division ' + e);
        localforage.setItem('topicDivision', document.getElementById('topicDivision').checked);

    });
    //Multiplication
    document.getElementById('topicMultiplication').addEventListener('click', (e) => {
        console.log('Multiplication ' + e);
        localforage.setItem('topicMultiplication', document.getElementById('topicMultiplication').checked);
    });
    //Factorial
    document.getElementById('topicFactorial').addEventListener('click', (e) => {
        console.log('Factorial ' + e);
        localforage.setItem('topicFactorial', document.getElementById('topicFactorial').checked);
    });
    //Percentage
    document.getElementById('topicPercentage').addEventListener('click', (e) => {
        console.log('Percentage ' + e);
        localforage.setItem('topicPercentage', document.getElementById('topicPercentage').checked);
    });
    //Exponent
    document.getElementById('topicExponent').addEventListener('click', (e) => {
        console.log('Exponent ' + e);
        localforage.setItem('topicExponents', document.getElementById('topicExponent').checked);
    });
    //Negatives
    document.getElementById('topicNegatives').addEventListener('click', (e) => {
        console.log('Negatives ' + e);
        localforage.setItem('topicNegatives', document.getElementById('topicNegatives').checked);
    });
    //Fractions
    document.getElementById('topicFractions').addEventListener('click', (e) => {
        console.log('Fractions ' + e);
        localforage.setItem('topicFractions', document.getElementById('topicFractions').checked);
    });
    //Decimals
    document.getElementById('topicDecimals').addEventListener('click', (e) => {
        console.log('Decimals ' + e);
        localforage.setItem('topicDecimals', document.getElementById('topicDecimals').checked);
    });
    //Logarithms
    document.getElementById('topicLogarithms').addEventListener('click', (e) => {
        console.log('Logarithms ' + e);
        localforage.setItem('topicLogarithms', document.getElementById('topicLogarithms').checked);
    });
}
addMenuEventListeners();

const getSettingsFromDB = async () => {
    document.getElementById('topicAddition').checked = await localforage.getItem('topicAddition');
    document.getElementById('topicSubtraction').checked = await localforage.getItem('topicSubtraction');
    document.getElementById('topicMultiplication').checked = await localforage.getItem('topicMultiplication');
    document.getElementById('topicDivision').checked = await localforage.getItem('topicDivision');
    document.getElementById('topicFactorial').checked = await localforage.getItem('topicFactorial');
    document.getElementById('topicPercentage').checked = await localforage.getItem('topicPercentage');
    document.getElementById('topicExponent').checked = await localforage.getItem('topicExponents');
    document.getElementById('topicNegatives').checked = await localforage.getItem('topicNegatives');
    document.getElementById('topicFractions').checked = await localforage.getItem('topicFractions');
    document.getElementById('topicDecimals').checked = await localforage.getItem('topicDecimals');
    document.getElementById('topicLogarithms').checked = await localforage.getItem('topicLogarithms');
}
