import React from 'react';
import Reflux from 'reflux';
import TestUtils from 'react-addons-test-utils';
import bro from 'jsdom-test-browser';
import { equal } from 'assert';

import connect, {connectToData} from '../module/';

describe('Reflux-hoc', () => {

  before(done => bro.newBrowser(done));

  it('', done => {
    const action = Reflux.createAction("fireBall");

    const Store = Reflux.createStore({
      init () {
        this.listenTo(action, this.onFireBall);
      },
      onFireBall (){
        this.trigger('fire');
      }
    });

    const Component = React.createClass({
      onStoreChange () {
        done();
      },

      render () { return <h1>Fire</h1> }
    });

    const ConnectedComponent = connect(Store)('onStoreChange')(Component);

    TestUtils.renderIntoDocument(
      <ConnectedComponent />
    );

    action();
  });

  it('', done => {
    const action = Reflux.createAction("fireBall");

    const Store = Reflux.createStore({
      init () {
        this.listenTo(action, this.onFireBall);
      },
      onFireBall (){
        this.trigger('fire');
      }
    });


    @connect(Store, 'onStoreChange')
    class Component extends React.Component {
      onStoreChange () {
        done();
      }

      render () { return <h1>Fire</h1> }
    }

    TestUtils.renderIntoDocument(
      <Component />
    );

    action();
  });

  it('', done => {
    const action = Reflux.createAction("fireBall");

    const Store = Reflux.createStore({
      init () {
        this.listenTo(action, this.onFireBall);
      },
      onFireBall (){
        this.trigger('fire');
      }
    });

    const Component = React.createClass({
      componentWillReceiveProps (nextProps) {
	if (this.props.fire !== nextProps.fire) {
          equal(nextProps.fire, 'fire');
          done();
	}
      },
      render () { return <h1>Fire</h1> }
    });

    const ConnectedComponent = connectToData({ fire : Store }, () => ({fire: 'fail'}))(Component);

    TestUtils.renderIntoDocument(
      <ConnectedComponent />
    );

    action();
  });
});
