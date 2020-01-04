
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from './pages/Settings';
import Home from './pages/Home';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  SettingScreen: { screen: Settings },
  HomeScreen: { screen: Home },
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
}
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
