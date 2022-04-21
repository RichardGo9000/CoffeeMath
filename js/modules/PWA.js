export default function enablePWAFunctionality() { //create a function that handles the PWA components
  // registers service worker
  if ('serviceWorker' in navigator) { //redigster service worker to cache files
      //            '../sw.js' 
      navigator.serviceWorker //tell the navigator to create a service worker
          .register('sw.js')  //regirster the sw.js as the service worker
          .then(() => {  //after service worker is registered then log to console
              console.log('Service worker registered');  //actually log msg to console
          });  //close service worker code block
  } //clsose if statement
  // Handle Install Prompt
  let deferredPrompt;  //create var for deferred prompt
  const addBtn = document.querySelector('.installBtn'); //connect var to install checkbox

  window.addEventListener('beforeinstallprompt', (e) => {  //add event listener for installevent
      //prevent chrome 67 & earlier from automatically showing prompt
      e.preventDefault(); 
      //stash the event so it can be triggered later
      deferredPrompt = e;
      // addBtn.style.display = 'block';
      addBtn.addEventListener('click', () => {  //listen for isntall button to be clicked
          // addBtn.style.display = 'none';
          //show the prompt
          deferredPrompt.prompt();  //actually run the install prompt that was deferred
          //wait for user to decide
          deferredPrompt.userChoice.then((choiceResult) => {  //listen for the answer from the install prompt
              if (choiceResult.outcome === 'accepted') {  //if install is accepted the log that is was accepted
                  console.log('User accepted A2HS prompt');  //log that user wants to install
              } else {  //else user did not accept install
                  console.log('User dismissied A2HS prompt'); //log that user does not want to install
              }  //close if else statement
              deferredPrompt = null;  //clear the defered prompt element
          });  //close defered promt selection code block
      });  //clsose deferred prompt event listener
  });  //close the beforeinstall event listener
} //close the class definition
