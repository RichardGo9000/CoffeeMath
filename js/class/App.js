import LocalDB from '../modules/LocalDB.js'; //import localDB files from module
import enablePWAFunctionality from '../modules/PWA.js';  //import PWA functions
import Quiz from '../Quiz.js';  //import quiz class
import User from '../User.js';  //import user class

const topics = [    //create array of topics
  'Addition',     //addition topic
  'Subtraction',  //subtractions topic
  'Division',  //division topic
  'Multiplication',  //multiplication topic
  'Factorial', //factorial topic
  'Percentage',  // percentage topic
  'Exponent',  //exponent topic
  'Negatives', //negatives topic,will affect other topics
  'Fractions', //fractions topic,will affect other topics
  'Decimals',  //decimals topic,will affect other topics
  'Logarithms',  //logarithms topics
]

export default class CoffeeMath { //export coffeemath class
  constructor(){  //define class constructor
    // First enable PWA Functionality
    enablePWAFunctionality();  //defines that enablePWAFunctionality is an exported function of the class
    // Set up the LocalDB
    this.localDB = new LocalDB();  //assigns class attribute as a new instance of LocalDB
    this.user = null;   //sets user as the second class attribute
    this.quiz = null;  //sets quiz as the 3rd class attribute.
  }

  async init(debug = false){  //create async function that has optional debuging, this runs when object.init is ran
    // Init user
    this.user = new User();  //init a new user object
    // Load user preferences
    await this.user.load(this.localDB, debug);  //pass the localDB objectect from above to the user load function
    // If we want to debug lets log this
    if (debug) console.log('[CoffeeMath:Init:Debug]', this);  //log a identifier for the coffeemath object if debugging
    // Load the preference menu state
    this.loadPreferenceMenuState(debug);  //? load a function that loops through the topics and sets the checkmark status of each
    // Attach listeners
    this.attachListeners(debug); //?load a function that loops through each id in the topic list and assigns an event listener for the checkbox
    // Start the Quiz
    this.quiz = new Quiz(this.user, debug)//once the settings menu is set to reflect the db and event listeners are set, then present the quiz
  }

  loadPreferenceMenuState(debug = false){  //this takes the settings in the topics array and loops through them setting the checkboxes to reflect the data in the array
    if (debug) console.log('[CoffeeMath:loadPreferenceMenuState]', this.user.topics);  //log the topics array to console if debugging
    topics.forEach(id => {  //loop through each topic in the topics array with a foreach loop
      document.getElementById(`topic${id}`).checked = this.user.topics[id.toLowerCase()]  //use document.getelementbyid to select each checkbox then set its checked status according to data in the array
    }) //close foreach loop
  }//close loadPreferencesMenuState function

  attachListeners(debug = false){ //loop though topics and create an event listener for each one
    topics.forEach(id => { //loop through each topic in topic array 
      document.getElementById(`topic${id}`).addEventListener('click', (e) => { //select each attribute by id and add event listener
        if (debug) console.log('[CoffeeMath:AttachListeners]', `topic${id} ${e.target.checked ? 'checked' : 'unchecked'}`); //log the status of each checkbox if debugging
        this.user.topics[id.toLowerCase()] = e.currentTarget.checked //set the cvalue in the topics array to match the checkbox when checkbox is clicked
        if (debug) console.log('[CoffeeMath:AttachListeners]', this.user.topics); //log the topics array
        this.user.save(this.localDB);  //store array in localdb using function for the user class
      })  //close the event listener code block
    }) //close the foreach loop through the topics array
  }//close the attachListeners function
}  //close the class definition
