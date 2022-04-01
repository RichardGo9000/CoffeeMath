import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';

export default class LocalDB {
  constructor() {

    this.config = { name: 'CoffeeMath', storeName: 'CoffeeMathSettings' };
    this.localforage = localforage;
    this.data = null;
    // Init Localforage
    this.localforage.config(this.config);
  }

  async load(debug = false){
    // Save the data locally so we can merge using it later
    this.data = await this.localforage.getItem('preferences')
    if (debug) console.log('[LocalDB:Load]', { data: this.data });
    return this.data;
  }

  save(data, debug = false){
    if (debug) console.log('[LocalDB:Save]', data);
    // Merge the current data, with the new data
    this.data = { ...this.data, ...data };
    if (debug) console.log('[LocalDB:Save]', { dataAfterMerge: this.data });
    return this.localforage.setItem('preferences', this.data)
  }
}
