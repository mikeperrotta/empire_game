import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 26,
    marginTop: 40,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Georgia',
    color: Colors.BOLD_BLUE,
    fontSize: 32,
  },
  explanationText: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    color: Colors.BOLD_BLUE,
    fontSize: 18,
    marginHorizontal: 64,
    marginVertical: 30,
  },
});

export class GameSetup extends Component {
  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight
              onPress={() => this.navigate('HomeScreen')}
              underlayColor={Colors.WHITE}>
            <Image source={require('../assets/backArrow.png')} />
          </TouchableHighlight>
          <TouchableHighlight
              onPress={() => this.navigate('RulesScreen')}
              underlayColor={Colors.WHITE}>
            <Image source={require('../assets/questionMark.png')} />
          </TouchableHighlight>
        </View>
        <Text style={styles.titleText}>
          Game Setup
        </Text>
        <Text style={styles.explanationText}>
          Pick a question. Each player will answer this question.
        </Text>
      </View>
    );
  }
}

export default GameSetup
