export default class User {
  constructor(){
    this.topics = {
      addition: true,
      subtraction: true,
      multiplication: true,
      division: true,
      factorial: false,
      percentage: false,
      exponent: false,
      negatives: false,
      fractions: false,
      decimals: false,
      logarithms: false
    }
  }

  async load(localDB, debug = false){
    let prefs = await localDB.load(debug);
    if (debug) console.log(`[User:load] -> prefs`, prefs);

    // If no preferences exist just use the default
    if (!prefs?.topics) prefs = { topics: this.topics };
    // Assign to the class for consumption by the Quiz
    this.topics = { ...prefs.topics };
  }

  save(localDB, debug = false){
    if (debug) console.log(`[User:save]`, this.topics);
    return localDB.save({ topics: this.topics }, debug);
  }
}
