import React, { Component } from 'react';
import { StyleSheet, Modal, View, TextInput, Text, TouchableHighlight, Image } from 'react-native';
import FuzzySet from 'fuzzyset.js';

import * as Analytics from '../core/Analytics';
import KeyboardShift from '../core/KeyboardShift';
import QUESTIONS from '../assets/Questions';
import { Colors } from '../core/styles/Colors';

const fuzzyThreshold = 0.675;

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
    lineHeight: 40,
    marginHorizontal: 30,
    marginVertical: 10,
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
    borderColor: Colors.LIGHT_BLUE,
    borderWidth: 1,
    color: Colors.BOLD_BLUE,
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    height: 48,
    paddingHorizontal: 20,
    width: 278,
  },
  progressText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'Georgia',
    fontSize: 40,
    margin: 16,
  },
  progressBarOuter: {
    backgroundColor: Colors.OFF_WHITE,
    borderRadius: 9,
    height: 18,
    width: 278,
  },
  progressBarInner: {
    backgroundColor: Colors.BOLD_BLUE,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE_HALF_TRANSPARENT,
    flex: 1,
    justifyContent: 'center',
  },
  modalSquare: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    height: 370,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    width: 300,
  },
  modalInnerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  modalText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'Georgia',
    fontSize: 28,
    paddingTop: 10,
  },
  modalExplanationText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  smallButton: {
    marginVertical: 5,
    width: 120,
  },
  buttonArea: {
    margin: 0,
  },
});

export class AnswerSubmission extends Component {

  constructor (props) {
    super(props)
    global.answers = [];
    this.state = {
      allAnswersCollected: false,
      currentAnswer: '',
      duplicateModalVisible: false,
      endGameModalVisible: false,
      numberSubmittedAnswers: 0,
      previousDuplicateModalVisible: false,
      progressBarWidth: '0%',
      remainingPlayersText: this.getRemainingPlayersText(),
      submitButtonEnabled: false,
      submitText: 'Submit',
      textInputEditable: true,
    };
  }

  fuzzyset = FuzzySet({useLevenshtein: false});
  previousDuplicates = FuzzySet({useLevenshtein: false});

  state = {
    numberSubmittedAnswers: 0,
  }

  navigate = (toScreen) => {
    Analytics.logEvent(Analytics.events.PAGE_CHANGE,
      {"fromPage": "AnswerSubmissionScreen", "toPage": toScreen});
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  enableSubmitButton = (enable) => {
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

  duplicateEntered = (duplicate) => {
    this.answerInput.clear();
    this.currentDuplicate = duplicate;
    this.previousDuplicates.add(duplicate);
    this.previousDuplicates.add(this.state.currentAnswer);
    this.showDuplicateModal(true);
    this.removePreviousAnswer(duplicate);
    this.updateNumberAnswersUI();
  }

  previousDuplicateEntered = () => {
    this.answerInput.clear();
    this.previousDuplicates.add(this.state.currentAnswer);
    this.showPreviousDuplicateModal(true);
  }

  removePreviousAnswer = (previousAnswer) => {
    var index = global.answers.indexOf(previousAnswer);
    if (index !== -1) {
      global.answers.splice(index, 1);
    }
    this.fuzzyset = FuzzySet({useLevenshtein: false});
    global.answers.forEach((answer) => this.fuzzyset.add(answer));
  }

  showDuplicateModal = (show) => {
    this.setState({duplicateModalVisible: show});
  }

  showPreviousDuplicateModal = (show) => {
    this.setState({previousDuplicateModalVisible: show});
  }

  checkIsDuplicate = (newAnswer) => {
    return this.fuzzyset.get(newAnswer, null, fuzzyThreshold);
  }

  checkIsPreviousDuplicate = (newAnswer) => {
    return this.previousDuplicates.get(newAnswer, null, fuzzyThreshold);
  }

  updateNumberAnswersUI = () => {
    this.setState({numberSubmittedAnswers: global.answers.length});
    this.setState({progressBarWidth: this.getProgressBarPercentageString()});
    this.setState({remainingPlayersText: this.getRemainingPlayersText()});
  }

  addAnswer = (newAnswer) => {
    global.answers.push(this.state.currentAnswer);
    this.fuzzyset.add(this.state.currentAnswer);
    this.answerInput.clear();
    this.updateNumberAnswersUI();
    if (global.answers.length < global.numberPlayers) {  // If we still need more answers
      this.enableSubmitButton(false);
    } else {  // If this was the last answer we needed
      this.enableSubmitButton(true);
      this.setState({submitText: 'Play!'});
      this.setState({textInputEditable: false});
      this.setState({allAnswersCollected: true});
    }
  }

  submitAnswer = () => {
    if (this.state.allAnswersCollected) {
      this.nextPage();
      return;
    }
    let currentAnswer = this.state.currentAnswer;
    Analytics.logEvent(Analytics.events.SUBMIT_ANSWER_TRY,
      {
        "submittedAnswer": currentAnswer,
        "numberSubmittedAnswers": this.state.numberSubmittedAnswers,
      });
    let duplicate = this.checkIsDuplicate(currentAnswer);
    if (duplicate) {
      Analytics.logEvent(Analytics.events.DETECTED_DUPLICATE,
        {
          "submittedAnswer": currentAnswer,
          "duplicate": duplicate,
        });
      this.duplicateEntered(duplicate[0][1]);
      return;
    }
    let previousDuplicate = this.checkIsPreviousDuplicate(currentAnswer);
    if (previousDuplicate) {
      Analytics.logEvent(Analytics.events.DETECTED_DUPLICATE,
        {
          "submittedAnswer": currentAnswer,
          "previousDuplicate": previousDuplicate,
        });
        this.previousDuplicateEntered();
        return;
    }
    this.addAnswer(currentAnswer);
    Analytics.logEvent(Analytics.events.SUBMIT_ANSWER_SUCCESS,
      {
        "submittedAnswer": currentAnswer,
        "numberSubmittedAnswers": this.state.numberSubmittedAnswers,
      });
  }

  nextPage = () => {
    this.navigate('GameScreen');
  }

  getProgressBarPercentageString = () => {
    let percent = global.answers.length / global.numberPlayers * 100;
    let string = percent + '%';
    return string;
  }

  getSubmitButtonStyle = () => {
    if (this.state.submitButtonEnabled) {
      return styles.button;
    }
    return [styles.button, styles.disabledButton];
  }

  getRemainingPlayersText = () => {
    // if (this.state.numberSubmittedAnswers)
    //   this.state.numberSubmittedAnswers + 1/global.numberPlayers players
    let string = '';
    if (global.answers.length < global.numberPlayers) {
      string = global.answers.length + ' of ' + global.numberPlayers + ' answers';
    } else {
      string = global.answers.length + ' of ' + global.numberPlayers + ' answers';
    }
    return string;
  }

  renderDuplicateModal = () => {
    return (
      <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.duplicateModalVisible}
      >
        <View style={styles.modalView}>
          <View style={styles.modalSquare}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.modalText}>Duplicate!</Text>
              <Text style={[styles.explanationText, styles.modalExplanationText]}>
                You and another player entered the same (or very similar) answers. Both answers will be removed and you and the other player must submit new answers.{"\n\n"}Please find the other player who entered "{this.currentDuplicate}" and let them know that they must enter a new answer.
              </Text>
              <View style={styles.buttonArea}>
                <TouchableHighlight
                    activeOpacity={1}
                    onPress={() => this.setState({duplicateModalVisible: false})}
                    style={[styles.button, styles.smallButton]}
                    underlayColor={Colors.DARK_BLUE}
                >
                  <Text style={styles.buttonText}>Okay</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        </Modal>
    );
  }

  renderPreviousDuplicateModal = () => {
    return (
      <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.previousDuplicateModalVisible}
      >
        <View style={styles.modalView}>
          <View style={[styles.modalSquare, {height: 310}]}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.modalText}>Duplicate!</Text>
              <Text style={[styles.explanationText, styles.modalExplanationText]}>
                Your answer "{this.state.currentAnswer}" was previously thrown out because two other players submitted that answer.{"\n\n"}Please submit a new answer.
              </Text>
              <View style={styles.buttonArea}>
                <TouchableHighlight
                    activeOpacity={1}
                    onPress={() => this.setState({previousDuplicateModalVisible: false})}
                    style={[styles.button, styles.smallButton]}
                    underlayColor={Colors.DARK_BLUE}
                >
                  <Text style={styles.buttonText}>Okay</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        </Modal>
    );
  }

  renderEndGameModal = () => {
    return (
      <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.endGameModalVisible}
      >
        <View style={styles.modalView}>
          <View style={[styles.modalSquare, {height: 300}]}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.modalText}>End game?</Text>
              <View style={styles.buttonArea}>
                <TouchableHighlight
                    activeOpacity={1}
                    onPress={this.endGame}
                    style={[styles.button, styles.smallButton]}
                    underlayColor={Colors.DARK_BLUE}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    onPress={() => this.setState({endGameModalVisible: false})}
                    style={[styles.button, styles.smallButton]}
                    underlayColor={Colors.DARK_BLUE}
                >
                  <Text style={styles.buttonText}>No, return</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  endGame = () => {
    global.answers = []
    this.setState({endGameModalVisible: false});
    this.navigate('HomeScreen');
  }

  render() {
    return (
      <>
      {
        this.renderDuplicateModal("Cleopatra")
      }
      {
        this.renderPreviousDuplicateModal("Cleopatra")
      }
      {
        this.renderEndGameModal()
      }



        <KeyboardShift>
          {() => (
            <View style={styles.container}>
              <View>
                <View style={styles.headerContainer}>
                  <TouchableHighlight
                      onPress={() => this.setState({endGameModalVisible: true})}
                      underlayColor={Colors.WHITE}>
                    <Image
                        source={require('../assets/close2x.png')}
                        style={{height: 38, width: 32}}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                      onPress={() => this.navigate('RulesScreen')}
                      underlayColor={Colors.WHITE}>
                    <Image
                        source={require('../assets/questionMark2x.png')}
                        style={{height: 50, width: 47}}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.titleText}>
                  {QUESTIONS[global.questionIndex].question}
                </Text>
              </View>

              {!this.state.allAnswersCollected ? (
                <>
                  <View style={styles.sectionView}>
                    <Text style={styles.explanationText}>
                      Pass the phone around for each{"\n"}player to enter their answer.
                    </Text>
                  </View>
                  <View style={styles.sectionView}>
                    <TextInput
                        editable={this.state.textInputEditable}
                        onSubmitEditing={this.onSubmitEditing}
                        placeholder='Your answer...'
                        placeholderTextColor={Colors.LIGHT_BLUE}
                        ref={ref => (this.answerInput = ref)}
                        returnKeyType='done'
                        style={styles.answerInput}
                    />
                  </View>
                </>
              ) : (
                <View style={styles.sectionView}>
                  <Text style={styles.explanationText}>
                    All answers have been submitted. Get ready to play!
                  </Text>
                </View>
              )
              }

              <View style={styles.sectionView}>
                <Text style={styles.progressText}>
                  {this.state.remainingPlayersText}
                </Text>
                <View style={styles.progressBarOuter}>
                  <View style={[styles.progressBarOuter, styles.progressBarInner, {width: this.state.progressBarWidth}]} />
                </View>
                <TouchableHighlight
                    activeOpacity={1}
                    disabled={!this.state.submitButtonEnabled}
                    onPress={this.submitAnswer}
                    style={this.getSubmitButtonStyle()}
                    underlayColor={Colors.DARK_BLUE}
                >
                  <Text style={styles.buttonText}>
                    {this.state.submitText}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </KeyboardShift>
      </>
    );
  }
}

export default AnswerSubmission;
