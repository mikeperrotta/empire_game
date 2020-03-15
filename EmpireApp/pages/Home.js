import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Button, TouchableHighlight } from 'react-native';

import * as Analytics from '../core/Analytics';
import * as Font from 'expo-font';
import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.VERY_LIGHT_BLUE_TRANSPARENT,
    borderColor: Colors.BOLD_BLUE,
    borderRadius: 9,
    borderWidth: 3,
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    margin: 20,
    width: 148,
  },
  buttonContainer: {
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 60,
  },
  logoImage: {
    height: 230,
    width: 230,
  },
  text: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'Herculanum',
    fontSize: 28,
  },
});

export class Home extends Component {
  state = {
    fontLoaded: false,
  };

  navigate = (toScreen) => {
    Analytics.logEvent(Analytics.events.PAGE_CHANGE,
      {"fromPage": "HomeScreen", "toPage": toScreen});
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Herculanum': require('../assets/fonts/Herculanum.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {return null;}
    return (
      <ImageBackground
          source={require('../assets/splash_1.jpg')}
          style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Image
              source={require('../assets/homescreen_logo2x.png')}
              style={styles.logoImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.navigate('NumberPlayersScreen')}
                style={styles.button}
                underlayColor={Colors.WHITE}
            >
              <Text style={styles.text}> Play </Text>
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.navigate('RulesScreen')}
                style={styles.button}
                underlayColor={Colors.WHITE}
            >
              <Text style={styles.text}> Rules </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Home
