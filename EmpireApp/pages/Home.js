import React, { Component } from 'react';
import { SplashScreen } from 'expo';
import { StyleSheet, View, Text, Image, ImageBackground, Button, TouchableHighlight } from 'react-native';
import { Asset } from 'expo-asset';

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
    areResourcesReady: false,
  };

  navigate = (toScreen) => {
    Analytics.logEvent(Analytics.events.PAGE_CHANGE,
      {"fromPage": "HomeScreen", "toPage": toScreen});
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  componentDidMount() {
    this.cacheResourcesAsync() // ask for resources
      .then(() => this.setState({ areResourcesReady: true })) // mark resources as loaded
      .catch(error => console.error(`Unexpected error thrown when loading:
        ${error.stack}`));
  }

  async cacheResourcesAsync() {
    await Font.loadAsync({
      'Herculanum': require('../assets/fonts/Herculanum.ttf'),
    });
    const images = [require('../assets/homescreen_logo2x.png')];
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.areResourcesReady) {return null;}
    return (
      <ImageBackground
          source={require('../assets/splash_1.jpg')}
          style={styles.backgroundImage}
          onLoadEnd={() => {SplashScreen.hide()}}
          fadeDuration={0}
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
