'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _flummox = require('flummox');

var FlummoxLocalStore = (function (_Store) {
  function FlummoxLocalStore(flux, arg1, arg2) {
    var _this = this;

    _classCallCheck(this, FlummoxLocalStore);

    _get(Object.getPrototypeOf(FlummoxLocalStore.prototype), 'constructor', this).call(this);
    var root = this;

    // Polymorphic arguments. Allow [key, state] or [state].
    var keyArg = undefined;
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
    var key = keyArg || root.constructor.name;

    // Initialize state from localStorage.
    var store = localStorage.getItem(key);
    if (store) {
      try {
        var parsedStore = JSON.parse(store);
        if (!!parsedStore && parsedStore.constructor === Object) {
          // Update state without triggering change.
          this.state = setState(this.state, parsedStore);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Add listener to sync localStorage on change.
    root.addListener('change', function () {
      localStorage.setItem(key, JSON.stringify(_this.state));
    });

    return this;
  }

  _inherits(FlummoxLocalStore, _Store);

  return FlummoxLocalStore;
})(_flummox.Store);

exports['default'] = FlummoxLocalStore;

function setState(objA, objB) {
  for (var key in objB) {
    objA[key] = objB[key];
  }
  return objA;
}
module.exports = exports['default'];
