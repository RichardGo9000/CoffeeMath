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

  async init(debug = false){
    // Init user
    this.user = new User();
    // Load user preferences
    await this.user.load(this.localDB, debug);
    // If we want to debug lets log this
    if (debug) console.log('[CoffeeMath:Init:Debug]', this);
    // Load the preference menu state
    this.loadPreferenceMenuState(debug);
    // Attach listeners
    this.attachListeners(debug);
    // Start the Quiz
    this.quiz = new Quiz(this.user, debug)
  }

  loadPreferenceMenuState(debug = false){
    if (debug) console.log('[CoffeeMath:loadPreferenceMenuState]', this.user.topics);
    topics.forEach(id => {
      document.getElementById(`topic${id}`).checked = this.user.topics[id.toLowerCase()]
    })
  }

  attachListeners(debug = false){
    topics.forEach(id => {
      document.getElementById(`topic${id}`).addEventListener('click', (e) => {
        if (debug) console.log('[CoffeeMath:AttachListeners]', `topic${id} ${e.target.checked ? 'checked' : 'unchecked'}`);
        this.user.topics[id.toLowerCase()] = e.currentTarget.checked
        if (debug) console.log('[CoffeeMath:AttachListeners]', this.user.topics);
        this.user.save(this.localDB);
      })
    })
  }
}
