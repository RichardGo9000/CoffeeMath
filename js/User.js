export default class User {  //create a user class that holds user data and functions to read & write them to localDB
  constructor(){  //when the user class is created, create this datastructure
    this.topics = {  //array of topics that hold boolean data defining if the user wants to practice that topic
      addition: true,  //addition topic, basic arithmetic
      subtraction: true, //subtraction topic, basic arithmetic
      multiplication: true, //multiplication topic, basic arithmetic
      division: true, //division topic, basic arithmetic
      factorial: false, //factorial topic, , advanced math
      percentage: false, //percentage topic, probability subcategory
      exponent: false,  //exponent topic, advanced algebra
      negatives: false, //negatives topic, basic arithmetic that affects all other categories
      fractions: false, //fractions topic, basic math that affects all other topics
      decimals: false, //decimals topic, basic math that affects all other topics
      logarithms: false  //log topic, advanced math
    }  //close the topics array
  } //close the constructor code block

  async load(localDB, debug = false){  //create a code block that loads data from local db, this one is asynchronous 
    let prefs = await localDB.load(debug);  //await localDB while it loads userprefs from localforage
    if (debug) console.log(`[User:load] -> prefs`, prefs);  //log the prefs to console if debugging

    // If no preferences exist just use the default
    if (!prefs?.topics) prefs = { topics: this.topics };  //if there are no prefs from localstorage the load the defaults stored in the constructor
    // Assign to the class for consumption by the Quiz
    this.topics = { ...prefs.topics };  //?? set the topics array to the same values as the prefs array we just retrieved?
  }// close the load function

  save(localDB, debug = false){//create a save function to store user preferences
    if (debug) console.log(`[User:save]`, this.topics);  //log that we are storing data to localdb if debugging
    return localDB.save({ topics: this.topics }, debug);  //use the localdb save function within this save function to store the data
  }//close the save function
}//close the user class definition
