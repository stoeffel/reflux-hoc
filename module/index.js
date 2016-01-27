import React from 'react';
import { curry } from '@thisables/curry';

const isArray = arg =>
  Object.prototype.toString.call(arg) === '[object Array]';


function connect (stores, onChange, component) {
  const theStores = isArray(stores)? stores: [stores];

  return React.createClass({
    componentDidMount() {
      this.unsubscribe = theStores.map(store => store.listen(this.node[onChange]));
    },

    componentWillUnmount() {
      this.unsubscribe.map(unsubscribe => unsubscribe());
    },

    render() {
      return React.createElement(
        component,
        { ...this.props, ref: node => this.node = node }
      );
    }
  });
};
export default connect::curry();

const _connectToData = (stores, initialState, component) => {
  return React.createClass({
    getInitialState() {
      return initialState;
    },

    componentDidMount() {
      this.unsubscribe = Object.keys(stores).map(key => {
        const store = stores[key];
        return store.listen(data => this.onChange(key, data));
      });
    },

    onChange(key, data) {
      const newState = {};
      newState[key] = data[key]? data[key]: data;
      this.setState(newState);
    },

    componentWillUnmount() {
      this.unsubscribe.map(unsubscribe => unsubscribe());
    },

    render() {
      return React.createElement(
        component,
        { ...this.props, ...this.state }
      );
    }
  });
};

export const connectToData = _connectToData::curry();
