flummox-localstore
==================

Syncs a Flummox Store with LocalStorage.

    npm install --save flummox-localstore

## Usage

Create a Store class that extends the flummox-localstore.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux);
  }
}
```

After that, whenever the store's state changes (e.g., via ```setState```),
the store will automatically serialize and dump its state into localStorage.

Whenever the store's lifecycle restarts, it will automatically reinitialize its
state from localStorage (deserializing it if possible).

## Configuring Initial State

By default, flummox-localstore will set your store's initial state to an empty
object```{}``` for you. You can set the ```initialState``` opt in your your
store's constructor's ```super()``` call as ```initialState```.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux, {
      initialState: {foo: 'bar'}
    });
  }
}
```

## Configuring localStorage Key

By default, the localStorage key is inferred from your Store's classname.
However, you can set a custom localStorage key by setting the ```key``` opt in
your constructor's ```super()``` call.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux, {
      key: 'my-custom-ls-key'
    });
  }
}
```

## Configuring localStorage Serializer

You can pass in a function that transforms or serializes your store's state
before syncing it to localStorage. This can help you to control what is stored
in localStorage and what isn't. You can set a serializer function by setting
the ```serializer``` opt in your store's constructor's ```super()``` call.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux, {
      serializer: state => {
        delete state.sessionKey;
        return state;
      }
    });
  }
}
```

## Developing

The tests were written also in es6 (```test.es6```). To run the tests:

    npm test
