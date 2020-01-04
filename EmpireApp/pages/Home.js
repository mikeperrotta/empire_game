import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Button, TouchableHighlight } from 'react-native';

import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.BOLD_BLUE,
    borderRadius: 5,
    height: 48,
    padding: 10,
    width: 148,
    margin: 20,
  },
  buttonContainer: {
    margin: 30,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    margin: 60,
  },
  logoImage: {
  },
  text: {
    color: Colors.WHITE_TEXT,
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
  },
});

export class Home extends Component {
  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  render() {
    return (
      <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/homepageBackground.png')}>
        <View style={styles.container}>
          <Image
              style={styles.logoImage}
              source={require('../assets/logo.png')} />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.navigate('HomeScreen')}
                style={styles.button}
                underlayColor={Colors.DARK_BLUE}>
              <Text style={styles.text}> Play </Text>
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.navigate('HomeScreen')}
                style={styles.button}
                underlayColor={Colors.DARK_BLUE}>
              <Text style={styles.text}> Rules </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Home
