import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './pages/Home';
import Rules from './pages/Rules';
import GameSetup from './pages/GameSetup'
import NumberPlayers from './pages/NumberPlayers'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  HomeScreen: { screen: Home },
  RulesScreen: { screen: Rules },
  GameSetupScreen: { screen: GameSetup },
  NumberPlayersScreen: {screen: NumberPlayers },
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
