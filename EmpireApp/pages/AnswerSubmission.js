import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableHighlight, Image } from 'react-native';

import KeyboardShift from '../core/KeyboardShift';
import QUESTIONS from '../assets/Questions';
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
  disabledButton: {
    backgroundColor: Colors.LIGHT_BLUE,
  },
  buttonArrow: {
    height: 20,
    width: 20,
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
  },
  answerInput: {
    height: 48,
    width: 278,
    borderColor: Colors.LIGHT_BLUE,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    color: Colors.DARK_BLUE,
  },
});

export class AnswerSubmission extends Component {

  state = {
    currentAnswer: '',
    submitButtonEnabled: false,
  }

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  enableSubmitButton = (enable) => {
    console.log('enabling submit button:', enable);
    this.setState({submitButtonEnabled: enable});
  }

  onSubmitEditing = (event) => {
    let text = event.nativeEvent.text;
    if (text && text.trim()) {
      this.setState({currentAnswer: text.trim()});
      this.enableSubmitButton(true);
    } else {
      this.enableSubmitButton(false);
    }
  }

  submitAnswer = () => {

  }

  nextPage = () => {
    // global.numberFakes = this.state.numberFakes;
    // this.navigate('AnswerSubmissionScreen');
    console.log(this.state.currentAnswer);
    this.answerInput.clear();
  }

  getSubmitButtonStyle = () => {
    if (this.state.submitButtonEnabled) {
      return styles.button;
    }
    return [styles.button, styles.disabledButton];
  }

  render() {
    return (
      <KeyboardShift>
        {() => (
          <View style={styles.container}>
            <View>
              <View style={styles.headerContainer}>
                <TouchableHighlight
                    onPress={() => this.props.navigation.goBack()}
                    underlayColor={Colors.WHITE}>
                  <Image
                      style={{height: 38, width: 32}}
                      source={require('../assets/close2x.png')}
                  />
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
                {QUESTIONS[global.questionIndex].question}
              </Text>
            </View>
            <View style={styles.sectionView}>
              <Text style={styles.explanationText}>
                Pass the phone around for each{"\n"}player to enter their answer.
              </Text>
            </View>
            <View style={styles.sectionView}>
              <TextInput
                  style={styles.answerInput}
                  placeholder='Your answer...'
                  returnKeyType='done'
                  placeholderTextColor={Colors.LIGHT_BLUE}
                  ref={ref => (this.answerInput = ref)}
                  onSubmitEditing={this.onSubmitEditing}
              />
            </View>
            <View style={styles.sectionView}>
              <TouchableHighlight
                  activeOpacity={1}
                  onPress={this.nextPage}
                  style={this.getSubmitButtonStyle()}
                  disabled={!this.state.submitButtonEnabled}
                  underlayColor={Colors.DARK_BLUE}>
                <Text style={styles.buttonText}>
                  Submit
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </KeyboardShift>
    );
  }
}

export default AnswerSubmission;
