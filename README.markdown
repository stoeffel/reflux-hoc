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

### passing the data as props

You can directly get the data from a stores as `props` with `connectToData`.

```jsx
import { connectToData } from 'reflux-hoc';

connectToData(
  { users: UserStore } // the store you want to connect to.
, (props) => ({ users: users.getUsers() }) // this function is call for the initialState and if the store changes.
, function({ users }) { // the users are passed down as a prop
    return (
      <ul>
        {this.props.users.map(u => <li>{u.name}</li>)}
      </ul>);
  }
);
```

### with a onChange callback on the component

:biohazard_sign: :biohazard_sign: :biohazard_sign:
This uses calls the provided `onChange` function on the child component.
If you use more then one HOC, make sure connect` is applied directly to the component.
:biohazard_sign: :biohazard_sign: :biohazard_sign:

```jsx
import connect from 'reflux-hoc';

const Component = React.createClass({
  onStoreChange () {
    // called on change
  },

  render () { return <h1>Fire</h1> }
});

const ConnectedComponent = connect(Store, 'onStoreChange', Component);
```



## API

### connectToData

// connectToData :: { a: Store } -> ({ a: * }) -> Component -> Component
connectToData({ persons: PersonStore, posts: PostStore }, () => ( { persons: [], posts: [] } ), Component);
```

### connect

```js
// connect :: Store -> String -> Component -> Component
connect(Store, CallbackName, Component);

// connect :: [Store] -> String -> Component -> Component
connect([Store1, Store2], CallbackName, Component);

// or
const connectToStores = connect([Store1, Store2]);

connectToStores('onStoresChange', Compnent);


## License

MIT © [Christoph Hermann](http://stoeffel.github.io)

[r]: https://github.com/reflux/refluxjs
