import LocalDB from '../modules/LocalDB.js';
import enablePWAFunctionality from '../modules/PWA.js';
import Quiz from '../Quiz.js';
import User from '../User.js';

const topics = [
  'Addition',
  'Subtraction',
  'Division',
  'Multiplication',
  'Factorial',
  'Percentage',
  'Exponent',
  'Negatives',
  'Fractions',
  'Decimals',
  'Logarithms',
]

export default class CoffeeMath {
  constructor(){
    // First enable PWA Functionality
    enablePWAFunctionality();
    // Set up the LocalDB
    this.localDB = new LocalDB();
    this.user = null;
    this.quiz = null;
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
