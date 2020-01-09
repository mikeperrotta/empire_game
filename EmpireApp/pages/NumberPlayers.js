import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text, TouchableHighlight, Image } from 'react-native';

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
    color: Colors.BOLD_BLUE,
    fontFamily: 'Georgia',
    fontSize: 32,
    marginVertical: 10,
    textAlign: 'center',
  },
  explanationText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    textAlign: 'center',
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
    alignItems: 'center',
    backgroundColor: Colors.BOLD_BLUE,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  rockerButtonTextArea: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 3,
    borderColor: Colors.BOLD_BLUE,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 3,
    height: 68,
    justifyContent: 'center',
    width: 62,
  },
  rockerButtonText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'HelveticaNeue',
    fontSize: 42,
    textAlign: 'center',
  },
  rockerRightButton: {
    alignItems: 'center',
    backgroundColor: Colors.BOLD_BLUE,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  buttonArrow: {
    height: 20,
    width: 20,
  },
});

const minNumberPlayers = 2;
const maxNumberPlayers = 99;

export class NumberPlayers extends Component {

  constructor (props) {
    super(props)
    this.state = {
      numberPlayers: global.numberPlayers || 5
    }
  }

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  adjustNumberPlayers = (increase) => {
    let { numberPlayers } = this.state;
    numberPlayers += increase ? 1 : -1;
    numberPlayers = numberPlayers < minNumberPlayers ? minNumberPlayers : numberPlayers;
    numberPlayers = numberPlayers > maxNumberPlayers ? maxNumberPlayers : numberPlayers;
    this.setState({numberPlayers: numberPlayers})
  }

  onChangedNumPlayersText = (event) => {
    let text = event.nativeEvent.text;
    let newNumberPlayers = parseInt(text, 10);
    if (isNaN(newNumberPlayers)) {
      // TODO: don't use this hack...
      newNumberPlayers = this.state.numberPlayers + 1;
    }
    newNumberPlayers = newNumberPlayers < minNumberPlayers ? minNumberPlayers : newNumberPlayers;
    newNumberPlayers = newNumberPlayers > maxNumberPlayers ? maxNumberPlayers : newNumberPlayers;
    this.setState({numberPlayers: newNumberPlayers});
  }

  nextPage = () => {
    global.numberPlayers = this.state.numberPlayers;
    this.navigate('GameSetupScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                underlayColor={Colors.WHITE}
            >
              <Image source={require('../assets/backArrow.png')} />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => this.navigate('RulesScreen')}
                underlayColor={Colors.WHITE}
            >
              <Image
                  source={require('../assets/questionMark2x.png')}
                  style={{height: 50, width: 47}}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.titleText}>
            Number of Players
          </Text>
        </View>
        <View style={styles.sectionView}>
          <Image
              source={require('../assets/people2x.png')}
              style={styles.peopleSymbol}
          />
          <View style={styles.rockerButton}>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.adjustNumberPlayers(false)}
                style={styles.rockerLeftButton}
                underlayColor={Colors.DARK_BLUE}
            >
              <Image
                  source={require('../assets/minus2x.png')}
                  style={{height: 41, width: 48}}
              />
            </TouchableHighlight>
            <View style={styles.rockerButtonTextArea}>
              <TextInput
                  clearTextOnFocus={true}
                  keyboardType={'number-pad'}
                  maxLength={2}
                  onEndEditing={this.onChangedNumPlayersText}
                  returnKeyType='done'
                  style={styles.rockerButtonText}
                  value={this.state.NumberPlayers}
              >
                {this.state.numberPlayers}
              </TextInput>
            </View>
              <TouchableHighlight
                  activeOpacity={1}
                  onPress={() => this.adjustNumberPlayers(true)}
                  style={styles.rockerRightButton}
                  underlayColor={Colors.DARK_BLUE}
              >
              <Image
                  source={require('../assets/plus2x.png')}
                  style={{height: 41, width: 48}}
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
              onPress={this.nextPage}
              style={styles.button}
              underlayColor={Colors.DARK_BLUE}
          >
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
