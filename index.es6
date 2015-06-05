import {Store} from 'flummox';


export default class FlummoxLocalStore extends Store {
  constructor(flux, arg1, arg2) {
    super();
    const root = this;

    // Polymorphic arguments. Allow [key, state] or [state].
    let keyArg;
    this.state = {};
    if (arg1 && arg1.constructor === String) {
      keyArg = arg1;
      this.state = arg2 || {};
    } else if (arg1 && arg1.constructor === Object) {
      this.state = arg1;
    } else {
      this.state = {};
    }

    // Deduce the key.
    let key = keyArg || root.constructor.name;

    // Initialize state from localStorage.
    let store = localStorage.getItem(key);
    if (store) {
      try {
        const parsedStore = JSON.parse(store);
        if (!!parsedStore && parsedStore.constructor === Object) {
          // Update state without triggering change.
          this.state = setState(this.state, parsedStore);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Add listener to sync localStorage on change.
    root.addListener('change', () => {
      localStorage.setItem(key, JSON.stringify(this.state));
    });

    return this;
  }
}


function setState(objA, objB) {
  for (var key in objB) {
    objA[key] = objB[key];
  }
  return objA;
}
