'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var MyStore = (function (_Store) {
  function MyStore(flux) {
    _classCallCheck(this, MyStore);

    _get(Object.getPrototypeOf(MyStore.prototype), 'constructor', this).call(this, flux);
  }

  _inherits(MyStore, _Store);

  return MyStore;
})(_index2['default']);

var MyStoreWithKey = (function (_Store2) {
  function MyStoreWithKey(flux) {
    _classCallCheck(this, MyStoreWithKey);

    _get(Object.getPrototypeOf(MyStoreWithKey.prototype), 'constructor', this).call(this, flux, { key: 'abc' });
  }

  _inherits(MyStoreWithKey, _Store2);

  return MyStoreWithKey;
})(_index2['default']);

var MyStoreWithInitialState = (function (_Store3) {
  function MyStoreWithInitialState(flux) {
    _classCallCheck(this, MyStoreWithInitialState);

    _get(Object.getPrototypeOf(MyStoreWithInitialState.prototype), 'constructor', this).call(this, flux, { initialState: { foo: 'bar' } });
  }

  _inherits(MyStoreWithInitialState, _Store3);

  return MyStoreWithInitialState;
})(_index2['default']);

var MyStoreWithKeyAndInitialState = (function (_Store4) {
  function MyStoreWithKeyAndInitialState(flux) {
    _classCallCheck(this, MyStoreWithKeyAndInitialState);

    _get(Object.getPrototypeOf(MyStoreWithKeyAndInitialState.prototype), 'constructor', this).call(this, flux, { key: 'abc', initialState: { foo: 'bar' } });
  }

  _inherits(MyStoreWithKeyAndInitialState, _Store4);

  return MyStoreWithKeyAndInitialState;
})(_index2['default']);

beforeEach(function () {
  localStorage.clear();
});

describe('FlummoxLocalStore', function () {
  it('initializes empty state', function () {
    var store = new MyStore();
    _assert2['default'].deepEqual(store.state, {});
  });

  it('initializes from localStorage', function () {
    localStorage.setItem('MyStore', '{"a": 1, "b": 2}');
    var store = new MyStore();
    _assert2['default'].deepEqual(store.state, { a: 1, b: 2 });
  });

  it('syncs to localStorage on setState', function () {
    var store = new MyStore();
    store.setState({ foo: 'bar' });
    _assert2['default'].deepEqual(JSON.parse(localStorage.getItem('MyStore')), { foo: 'bar' });
  });

  it('syncs to localStorage on replaceState', function () {
    var store = new MyStore();
    store.replaceState({ foo: 'bar' });
    _assert2['default'].deepEqual(JSON.parse(localStorage.getItem('MyStore')), { foo: 'bar' });
  });

  it('handles non-deserializable state', function () {
    localStorage.setItem('MyStore', new Object());
    var store = new MyStore();
    _assert2['default'].deepEqual(store.state, {});
  });

  it('is able to specify key', function () {
    localStorage.setItem('abc', JSON.stringify({ foo: 'bar' }));
    var store = new MyStoreWithKey();
    _assert2['default'].deepEqual(store.state, { foo: 'bar' });
    store.setState({ baz: 'qux' });
    _assert2['default'].deepEqual(JSON.parse(localStorage.getItem('abc')), { foo: 'bar', baz: 'qux' });
  });

  it('is able to specify initialState', function () {
    var store = new MyStoreWithInitialState();
    _assert2['default'].deepEqual(store.state, { foo: 'bar' });
  });

  it('has localStorage state overriding initialState', function () {
    localStorage.setItem('MyStoreWithInitialState', JSON.stringify({ foo: 'baz', bar: 'qux' }));
    var store = new MyStoreWithInitialState();
    _assert2['default'].deepEqual(store.state, { foo: 'baz', bar: 'qux' });
  });

  it('is able to specify initialState with key', function () {
    localStorage.setItem('abc', JSON.stringify({ bar: 'baz' }));
    var store = new MyStoreWithKeyAndInitialState();
    _assert2['default'].deepEqual(store.state, { foo: 'bar', bar: 'baz' });
  });
});
