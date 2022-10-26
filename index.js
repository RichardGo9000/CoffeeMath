import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';
import Quiz from './js/Quiz.js';

// Main Web App
//*************



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
console.log('*****Begin Datalayer section*******');
const dataLayer = async () => {

    console.log('**1) Running Datalayer section**');
        const initDB = async () => {
            console.log('**2) Running initDB section**');
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
console.log('*****End Datalayer section*******');

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
        localforage.setItem('topicExponent', document.getElementById('topicExponent').checked);
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
//     document.getElementById('topicAddition').checked = await localforage.getItem('topicAddition');
//     document.getElementById('topicSubtraction').checked = await localforage.getItem('topicSubtraction');
//     document.getElementById('topicMultiplication').checked = await localforage.getItem('topicMultiplication');
//     document.getElementById('topicDivision').checked = await localforage.getItem('topicDivision');
//     document.getElementById('topicFactorial').checked = await localforage.getItem('topicFactorial');
//     document.getElementById('topicPercentage').checked = await localforage.getItem('topicPercentage');
//     document.getElementById('topicExponent').checked = await localforage.getItem('topicExponent');
//     document.getElementById('topicNegatives').checked = await localforage.getItem('topicNegatives');
//     document.getElementById('topicFractions').checked = await localforage.getItem('topicFractions');
//     document.getElementById('topicDecimals').checked = await localforage.getItem('topicDecimals');
//     document.getElementById('topicLogarithms').checked = await localforage.getItem('topicLogarithms');

//     // once line 177 is working I can add the actuall settings from localforage
//     thisQuiz.possibleQuestions = [
//         "a",
//         "s",
//         "d",
//         "m",
//         "f",
//         "e"
//     ];
    let questionsAccumulator = [];
    let topicAddition = await localforage.getItem('topicAddition');
    document.getElementById('topicAddition').checked = topicAddition;
    if (topicAddition) {
        questionsAccumulator.push('a');
    }
    
    let topicSubtraction =  await localforage.getItem('topicSubtraction');
    document.getElementById('topicSubtraction').checked = topicSubtraction;
    if (topicSubtraction) {
        questionsAccumulator.push('s');
    }

    let topicMultiplication = await localforage.getItem('topicMultiplication');
    document.getElementById('topicMultiplication').checked = topicMultiplication;
    if (topicMultiplication) {
        questionsAccumulator.push('m');
    }

    let topicDivision = await localforage.getItem('topicDivision');
    document.getElementById('topicDivision').checked = topicDivision;
    if (topicDivision) {
        questionsAccumulator.push('d');
    }

    let topicFactorial = await localforage.getItem('topicFactorial');
    document.getElementById('topicFactorial').checked = topicFactorial;
    if (topicFactorial) {
        questionsAccumulator.push('f');
    }

    let topicPercentage = await localforage.getItem('topicPercentage');
    document.getElementById('topicPercentage').checked = topicPercentage;
    if (topicPercentage) {
        questionsAccumulator.push('p');
    }

    let topicExponent = await localforage.getItem('topicExponent');
    document.getElementById('topicExponent').checked = topicExponent;
    if (topicExponent) {
        questionsAccumulator.push('e');
    }

    let topicNegatives = await localforage.getItem('topicNegatives');
    document.getElementById('topicNegatives').checked = topicNegatives;


    let topicFractions = await localforage.getItem('topicFractions');
    document.getElementById('topicFractions').checked = topicFractions;


    let topicDecimals = await localforage.getItem('topicDecimals');
    document.getElementById('topicDecimals').checked = topicDecimals;


    let topicLogarithms = await localforage.getItem('topicLogarithms');
    document.getElementById('topicLogarithms').checked = topicLogarithms;
    
//     console.log("Update topics List is: " + questionsAccumulator);
    
    return questionsAccumulator;
    
    
}


// Present Quiz

console.log("Calling Quiz()");
// this was the source of the problem
// let thisQuiz = new Quiz().init();

// This is the solution to the problem
let thisQuiz = new Quiz();
thisQuiz.init(getSettingsFromDB());
