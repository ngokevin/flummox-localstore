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
object```{}``` for you. You can pass in an object representing your desired
initial state into your store's constructor's ```super()``` call.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux, {foo: 'bar'});
  }
}
```

## Configuring localStorage Key

By default, the localStorage key is inferred from your Store's classname.
However, you can set a custom localStorage key by passing it into your store's
constructor's ```super()``` call.

```js
import Store from 'flummox-localstore';

class MyStore extends Store {
  constructor(flux) {
    super(flux, 'my-custom-ls-key', {foo: 'bar'});
  }
}
```

## Developing

This project was written in es6 (```index.es6```). To compile the
project for publishing:

    npm build

The tests were written also in es6 (```test.es6```). To run the tests:

    npm test
