import React from 'react';
import { curry } from '@thisables/curry';

const isArray = arg =>
  Object.prototype.toString.call(arg) === '[object Array]';

function connect (stores, onChange, component) {
  const theStores = isArray(stores)? stores: [stores];

  return React.createClass({
    componentDidMount() {
      this.unsubscribe = theStores
				.map(store => store.listen(this.node[onChange]));
    },

    componentWillUnmount() {
      this.unsubscribe
				.map(unsubscribe => unsubscribe());
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

