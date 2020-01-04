import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Rules from './pages/Rules';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  HomeScreen: { screen: Home },
  RulesScreen: { screen: Rules },
  SettingScreen: { screen: Settings },
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
