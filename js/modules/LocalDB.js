import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';  //get a copy of localforage from the skypack cdn

export default class LocalDB {  //begin class definition of LocalDB
  constructor() {  //open constrtuctor to run when object is created

    this.config = { name: 'CoffeeMath', storeName: 'CoffeeMathSettings' };  //set config info for localforage defining our own db and table name
    this.localforage = localforage;  //set localforage as an object attribute
    this.data = null;  //create a space to hole the returned data 
    // Init Localforage
    this.localforage.config(this.config);  //initialize localforage
  } //close constructor

  async load(debug = false){  //define a acynchronous load function, default to not showing debug info  
    // Save the data locally so we can merge using it later
    this.data = await this.localforage.getItem('preferences')  //await data coming from local storage
    if (debug) console.log('[LocalDB:Load]', { data: this.data });  //if debugging then log the data that is returned
    return this.data;  //return the data that was fetched
  }  //close load function

  save(data, debug = false){  //store data in localdb
    if (debug) console.log('[LocalDB:Save]', data);  //log data to console
    // Merge the current data, with the new data
    this.data = { ...this.data, ...data };  //use spread operator to add any changes to the data atribute from the data returned from local db
    if (debug) console.log('[LocalDB:Save]', { dataAfterMerge: this.data });  //log data after spread operator has been run
    return this.localforage.setItem('preferences', this.data)  //actually store data in localdb
  }  //close save function
} //close class definition
