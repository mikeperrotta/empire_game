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
    marginVertical: 10,
    marginHorizontal: 30,
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
  maskSymbol: {
    height: 90,
    width: 83,
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

const minNumberPlayers = 0;
const maxNumberPlayers = 5;

function getRecommendedNumberFakes(numberPlayers) {
  if (numberPlayers <= 3) {
    return 2;
  }
  if (numberPlayers <= 8) {
    return 3;
  }
  if (numberPlayers <= 12) {
    return 4;
  }
  return 5;
}

export class NumberFakes extends Component {

  constructor (props) {
    super(props)
    this.state = {
      numberFakes: getRecommendedNumberFakes(global.numberPlayers)
    }
  }

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  adjustNumberFakes = (increase) => {
    let { numberFakes } = this.state;
    numberFakes += increase ? 1 : -1;
    numberFakes = numberFakes < minNumberPlayers ? minNumberPlayers : numberFakes;
    numberFakes = numberFakes > maxNumberPlayers ? maxNumberPlayers : numberFakes;
    this.setState({numberFakes: numberFakes})
  }

  onChangedNumFakesText = (event) => {
    let text = event.nativeEvent.text;
    let newNumberFakes = parseInt(text, 10);
    if (isNaN(newNumberFakes)) {
      // TODO: don't use this hack...
      newNumberFakes = this.state.numberFakes + 1;
    }
    newNumberFakes = newNumberFakes < minNumberPlayers ? minNumberPlayers : newNumberFakes;
    newNumberFakes = newNumberFakes > maxNumberPlayers ? maxNumberPlayers : newNumberFakes;
    this.setState({numberFakes: newNumberFakes});
  }

  nextPage = () => {
    global.numberFakes = this.state.numberFakes;
    this.navigate('QuestionSubmissionScreen');
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
            Fake Answers
          </Text>
        </View>
        <View style={styles.sectionView}>
          <Image
              style={styles.maskSymbol}
              source={require('../assets/mask2x.png')}
          />
          <View style={styles.rockerButton}>
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.adjustNumberFakes(false)}
                style={styles.rockerLeftButton}
                underlayColor={Colors.DARK_BLUE}>
              <Image
                  style={{height: 41, width: 48}}
                  source={require('../assets/minus2x.png')}
              />
            </TouchableHighlight>
            <View style={styles.rockerButtonTextArea}>
              <TextInput
                  clearTextOnFocus={true}
                  keyboardType={'number-pad'}
                  maxLength={2}
                  onEndEditing={this.onChangedNumFakesText}
                  returnKeyType='done'
                  style={styles.rockerButtonText}
                  value={this.state.NumberFakes}
              >
                {this.state.numberFakes}
              </TextInput>
            </View>
              <TouchableHighlight
                  activeOpacity={1}
                  onPress={() => this.adjustNumberFakes(true)}
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
            Please set the number of fake answers that will be added to the list of answers.{"\n\n"}For {global.numberPlayers} players, we recommend {getRecommendedNumberFakes(global.numberPlayers)} fake answers.
          </Text>
        </View>
        <View style={styles.sectionView}>
          <TouchableHighlight
              activeOpacity={1}
              onPress={this.nextPage}
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

export default NumberFakes
