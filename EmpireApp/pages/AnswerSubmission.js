import React, { Component } from 'react';
import { StyleSheet, Modal, View, TextInput, Text, TouchableHighlight, Image } from 'react-native';
import FuzzySet from 'fuzzyset.js';

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
    lineHeight: 40,
    fontSize: 32,
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
    color: Colors.BOLD_BLUE,
  },
  progressText: {
    fontFamily: 'Georgia',
    fontSize: 40,
    color: Colors.BOLD_BLUE,
    margin: 16,
  },
  progressBarOuter: {
    height: 18,
    width: 278,
    backgroundColor: Colors.OFF_WHITE,
    borderRadius: 9,
  },
  progressBarInner: {
    backgroundColor: Colors.BOLD_BLUE,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE_HALF_TRANSPARENT,
  },
  modalSquare: {
    backgroundColor: Colors.WHITE,
    height: 370,
    width: 300,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
  },
  modalInnerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 28,
    color: Colors.BOLD_BLUE,
    paddingTop: 10,
  },
  modalExplanationText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  smallButton: {
    width: 120,
    marginVertical: 5,
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
      currentAnswer: '',
      submitButtonEnabled: false,
      numberSubmittedAnswers: 0,
      progressBarWidth: '0%',
      remainingPlayersText: this.getRemainingPlayersText(),
      submitText: 'Submit',
      textInputEditable: true,
      duplicateModalVisible: false,
      previousDuplicateModalVisible: false,
      endGameModalVisible: false,
      allAnswersCollected: false,
    };
  }

  fuzzyset = FuzzySet({useLevenshtein: false});
  previousDuplicates = FuzzySet({useLevenshtein: false});

  state = {
    numberSubmittedAnswers: 0,
  }

  navigate = (toScreen) => {
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
    let fuzzyCheck = this.fuzzyset.get(newAnswer, null, 0.4);
    return fuzzyCheck == null ? null : fuzzyCheck[0][1];
  }

  checkIsPreviousDuplicate = (newAnswer) => {
    return this.previousDuplicates.get(newAnswer, null, 0.4);
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
    if (!this.state.allAnswersCollected) {
      let currentAnswer = this.state.currentAnswer;
      let duplicate = this.checkIsDuplicate(currentAnswer);
      if (duplicate) {
        this.duplicateEntered(duplicate);
      } else if (this.checkIsPreviousDuplicate(currentAnswer)) {
        this.previousDuplicateEntered();
      } else {
        this.addAnswer(currentAnswer);
      }
    } else {
      this.nextPage();
    }
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
                    underlayColor={Colors.DARK_BLUE}
                    style={[styles.button, styles.smallButton]}
                    onPress={() => this.setState({duplicateModalVisible: false})}
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
                    underlayColor={Colors.DARK_BLUE}
                    style={[styles.button, styles.smallButton]}
                    onPress={() => this.setState({previousDuplicateModalVisible: false})}
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
              <Text style={styles.modalText}>End Game?</Text>
              <View style={styles.buttonArea}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={Colors.DARK_BLUE}
                    style={[styles.button, styles.smallButton]}
                    onPress={this.endGame}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={Colors.DARK_BLUE}
                    style={[styles.button, styles.smallButton]}
                    onPress={() => this.setState({endGameModalVisible: false})}
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

              {!this.state.allAnswersCollected ? (
                <>
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
                        editable={this.state.textInputEditable}
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
                    onPress={this.submitAnswer}
                    style={this.getSubmitButtonStyle()}
                    disabled={!this.state.submitButtonEnabled}
                    underlayColor={Colors.DARK_BLUE}>
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
