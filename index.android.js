/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App'

export default class fooie extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('fooie', () => fooie);
