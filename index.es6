import {Store} from 'flummox';


export default class FlummoxLocalStore extends Store {
  constructor(flux, opts) {
    /* opts:
       initialState -- initialState, overwritten by localStorage data.
       serializer -- transform function run on state going into localStorage.
       key -- localStorage key.
    */
    super();
    const root = this;
    opts = opts || {};

    // Infer the key.
    let key = opts.key || root.constructor.name;
    this._localStorageKey = key;

    // Set initial state.
    this.state = opts.initialState || {};

    // Initialize state from localStorage.
    let store = localStorage.getItem(key);
    if (store) {
      try {
        const parsedStore = JSON.parse(store);
        if (!!parsedStore && parsedStore.constructor === Object) {
          // Update state without triggering change.
          this.state = setInitialState(this.state, parsedStore);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Add listener to sync localStorage on change.
    root.addListener('change', () => {
      let state = this.state;
      if (opts.serializer && opts.serializer.constructor) {
        // Run serializer over data.
        state = opts.serializer(state);
      }
      localStorage.setItem(key, JSON.stringify(state));
    });

    return this;
  }
}


function setInitialState(objA, objB) {
  for (var key in objB) {
    objA[key] = objB[key];
  }
  return objA;
}
