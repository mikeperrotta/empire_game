// Home.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export class Home extends Component {
  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/homepageBackground.png')}
      >
        <Text>
          Text!
        </Text>
      </ImageBackground>
    );
  }
}

export default Home
