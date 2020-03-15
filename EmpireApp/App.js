import React, { Component } from 'react';
import { SplashScreen } from 'expo';
import { StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import * as Analytics from './core/Analytics';
import AnswerSubmission from './pages/AnswerSubmission'
import Game from './pages/Game'
import GameSetup from './pages/GameSetup'
import Home from './pages/Home';
import NumberFakes from './pages/NumberFakes'
import NumberPlayers from './pages/NumberPlayers'
import Rules from './pages/Rules';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  AnswerSubmissionScreen: {screen: AnswerSubmission },
  GameScreen: {screen: Game },
  GameSetupScreen: { screen: GameSetup },
  HomeScreen: { screen: Home },
  NumberFakesScreen: {screen: NumberFakes },
  NumberPlayersScreen: {screen: NumberPlayers },
  RulesScreen: { screen: Rules },
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
}
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  constructor (props) {
    Analytics.logEvent(Analytics.events.APP_START);
    super(props);
    SplashScreen.preventAutoHide();
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <AppContainer />
    );
  }
}
