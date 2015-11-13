<h1 align="center">reflux-hoc</h1>

[![Travis](https://img.shields.io/travis/stoeffel/reflux-hoc.svg?style=flat-square)](https://travis-ci.org/stoeffel/reflux-hoc)
[![David](https://img.shields.io/david/stoeffel/reflux-hoc.svg?style=flat-square)](https://david-dm.org/stoeffel/reflux-hoc)
[![npm](https://img.shields.io/npm/v/reflux-hoc.svg?style=flat-square)](https://www.npmjs.com/package/reflux-hoc)

> Higher order component for [reflux][r]

## Installation

```
$ npm install --save reflux-hoc
```

## Usage

```jsx
import connect from 'reflux-hoc';

const action = Reflux.createAction("fireBall");

const Store = Reflux.createStore({
	init () {
		this.listenTo(action, this.onFireBall);
	},
	onFireBall (){
	}
});

const Component = React.createClass({
	onStoreChange () {
		// called on change
	},

	render () { return <h1>Fire</h1> }
});

const ConnectedComponent = connect(Store, 'onStoreChange', Component);

action();
```

## API

```js
// connect :: Store -> String -> Component -> Component
connect(Store, CallbackName, Component);

// connect :: [Store] -> String -> Component -> Component
connect([Store1, Store2], CallbackName, Component);

// or
const connectToStores = connect([Store1, Store2]);

connectToStores('onStoresChange', Compnent);

```


## License

MIT © [Christoph Hermann](http://stoeffel.github.io)

[r]: https://github.com/reflux/refluxjs
