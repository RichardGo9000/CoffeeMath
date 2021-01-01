// Set up dependencies and card div with injectApp()
// start app and populate card with quiz
// if settings menu is open show settings
// if quiz is complete show results
import Quiz from './Quiz.js';

((): void => {
  document.getElementById("app").innerHTML = '<div id="card"></div>'
  new Quiz().init()
})()
