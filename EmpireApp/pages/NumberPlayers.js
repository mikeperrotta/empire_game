import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, Image } from 'react-native';

import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 26,
    marginTop: 40,
  },
  titleText: {
    marginVertical: 10,
    fontFamily: 'Georgia',
    color: Colors.BOLD_BLUE,
    fontSize: 32,
    textAlign: 'center',
  },
  explanationText: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    color: Colors.BOLD_BLUE,
    fontSize: 18,
    width: 280,
  },
  sectionView: {
    alignItems: 'center',
  },
  peopleSymbol: {
    height: 75,
    width: 125,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.BOLD_BLUE,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 24,
    width: 328,
  },
  rockerButton: {
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 20,
  },
  rockerLeftButton: {
    height: 68,
    width: 68,
    backgroundColor: Colors.BOLD_BLUE,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rockerButtonTextArea: {
    height: 68,
    width: 62,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BOLD_BLUE,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    justifyContent: 'center',
  },
  rockerButtonText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 42,
    color: Colors.BOLD_BLUE,
    textAlign: 'center',
  },
  rockerRightButton: {
    height: 68,
    width: 68,
    backgroundColor: Colors.BOLD_BLUE,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArrow: {
    height: 20,
    width: 20,
  },
});

export class NumberPlayers extends Component {

  constructor (props) {
    super(props)
    this.state = {
      numberPlayers: 5
    }
  }

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  adjustNumberPlayers = (increase) => {
    let { numberPlayers } = this.state;
    numberPlayers += increase? 1 : -1;
    numberPlayers = numberPlayers < 2 ? 2 : numberPlayers;
    numberPlayers = numberPlayers > 99 ? 99 : numberPlayers;
    this.setState({numberPlayers: numberPlayers})
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                underlayColor={Colors.WHITE}>
              <Image source={require('../assets/backArrow.png')} />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => this.navigate('RulesScreen')}
                underlayColor={Colors.WHITE}>
              <Image
                  style={{height: 50, width: 47}}
                  source={require('../assets/questionMark2x.png')}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.titleText}>
            Number of Players
          </Text>
        </View>
        <View style={styles.sectionView}>
          <Image
              style={styles.peopleSymbol}
              source={require('../assets/people2x.png')}
          />
          <View style={styles.rockerButton}>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.adjustNumberPlayers(false)}
                style={styles.rockerLeftButton}
                underlayColor={Colors.DARK_BLUE}>
              <Image
                  style={{height: 41, width: 48}}
                  source={require('../assets/minus2x.png')}
              />
            </TouchableHighlight>
            <View style={styles.rockerButtonTextArea}>
              <Text style={styles.rockerButtonText}>
                {this.state.numberPlayers}
              </Text>
            </View>
              <TouchableHighlight
                  activeOpacity={1}
                  onPress={() => this.adjustNumberPlayers(true)}
                  style={styles.rockerRightButton}
                  underlayColor={Colors.DARK_BLUE}>
              <Image
                  style={{height: 41, width: 48}}
                  source={require('../assets/plus2x.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.explanationText}>
            Please set the number of players.{"\n\n"}You can play with two or more players, and five to ten is ideal.
          </Text>
        </View>
        <View style={styles.sectionView}>
          <TouchableHighlight
              activeOpacity={1}
              onPress={() => this.navigate('GameSetupScreen')}
              style={styles.button}
              underlayColor={Colors.DARK_BLUE}>
            <Image
                source={require('../assets/nextArrow.png')}
                style={styles.buttonArrow}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default NumberPlayers
