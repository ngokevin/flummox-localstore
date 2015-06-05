import assert from 'assert';

import Store from './index';


class MyStore extends Store {
  constructor(flux) {
    super(flux);
  }
}


class MyStoreWithKey extends Store {
  constructor(flux) {
    super(flux, {key: 'abc'});
  }
}


class MyStoreWithInitialState extends Store {
  constructor(flux) {
    super(flux, {initialState: {foo: 'bar'}});
  }
}


class MyStoreWithKeyAndInitialState extends Store {
  constructor(flux) {
    super(flux, {key: 'abc', initialState: {foo: 'bar'}});
  }
}


class MyStoreWithSerializer extends Store {
  constructor(flux) {
    const serializer = state => {
      delete state.foo;
      return state;
    };
    super(flux, {serializer: serializer});
  }
}


class MyStoreWithBadSerializer extends Store {
  constructor(flux) {
    const serializer = state => {
      return undefined;
    };
    super(flux, {serializer: serializer});
  }
}


beforeEach(() => {
  localStorage.clear();
});


describe('FlummoxLocalStore', () => {
  it('initializes empty state', () => {
    const store = new MyStore();
    assert.deepEqual(store.state, {});
  });

  it('initializes from localStorage', () => {
    localStorage.setItem('MyStore', '{"a": 1, "b": 2}');
    const store = new MyStore();
    assert.deepEqual(store.state, {a: 1, b: 2});
  });

  it('syncs to localStorage on setState', () => {
    const store = new MyStore();
    store.setState({foo: 'bar'});
    assert.deepEqual(JSON.parse(localStorage.getItem('MyStore')),
                     {foo: 'bar'});
  });

  it('syncs to localStorage on replaceState', () => {
    const store = new MyStore();
    store.replaceState({foo: 'bar'});
    assert.deepEqual(JSON.parse(localStorage.getItem('MyStore')),
                     {foo: 'bar'});
  });

  it('handles non-deserializable state', () => {
    localStorage.setItem('MyStore', new Object());
    const store = new MyStore();
    assert.deepEqual(store.state, {});
  });

  it('is able to specify key', () => {
    localStorage.setItem('abc', JSON.stringify({foo: 'bar'}));
    const store = new MyStoreWithKey();
    assert.deepEqual(store.state, {foo: 'bar'});
    store.setState({baz: 'qux'});
    assert.deepEqual(JSON.parse(localStorage.getItem('abc')),
                     {foo: 'bar', baz: 'qux'});
  });

  it('is able to specify initialState', () => {
    const store = new MyStoreWithInitialState();
    assert.deepEqual(store.state, {foo: 'bar'});
  });

  it('has localStorage state overriding initialState', () => {
    localStorage.setItem('MyStoreWithInitialState',
                         JSON.stringify({foo: 'baz', bar: 'qux'}));
    const store = new MyStoreWithInitialState();
    assert.deepEqual(store.state, {foo: 'baz', bar: 'qux'});
  });

  it('is able to specify initialState with key', () => {
    localStorage.setItem('abc', JSON.stringify({bar: 'baz'}));
    const store = new MyStoreWithKeyAndInitialState();
    assert.deepEqual(store.state, {foo: 'bar', bar: 'baz'});
  });

  it('takes serialize function', () => {
    const store = new MyStoreWithSerializer();
    store.setState({foo: 'bar', baz: 'qux'});
    assert.deepEqual(JSON.parse(localStorage.getItem('MyStoreWithSerializer')),
                     {baz: 'qux'});
  });

  it('handles bad serializer', () => {
    const store = new MyStoreWithBadSerializer();
    assert.throws(() => {
      store.setState({foo: 'bar'});
    });
  });
});
