import React, { Component } from 'react';
import { Modal, StyleSheet, View, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import FuzzySet from 'fuzzyset.js';

import KeyboardShift from '../core/KeyboardShift';
import QUESTIONS from '../assets/Questions';
import { Colors } from '../core/styles/Colors';

var shuffle = require('shuffle-array')

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
    lineHeight: 40,
  },
  explanationText: {
    fontFamily: 'HelveticaNeue',
    color: Colors.BOLD_BLUE,
    fontSize: 18,
    marginHorizontal: 32,
    marginVertical: 24,
  },
  answerText: {
    fontFamily: 'HelveticaNeue',
    color: Colors.BOLD_BLUE,
    fontSize: 24,
    padding: 20,
    textAlign: 'center',
  },
  sectionView: {
    alignItems: 'center',
  },
  listScrollView: {
    alignSelf: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    minWidth: '85%',
  },
  listSection: {
    backgroundColor: Colors.VERY_LIGHT_BLUE,
    borderRadius: 20,
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
  buttonArrow: {
    height: 20,
    width: 20,
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
  },
  horizontalRule: {
    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 1.75,
    width: '100%',
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE_HALF_TRANSPARENT,
  },
  modalSquare: {
    backgroundColor: Colors.WHITE,
    height: 300,
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
  smallButton: {
    width: 120,
    marginVertical: 5,
  },
  buttonArea: {
    margin: 0,
  },
});

const explanationText = 'All players get to read the list of answers once at the start of the game.\n\nThe list can be shown again if all players agree to see it again.\n\nOn your turn, you guess by matching any answer to any player.\n\nIf you guess incorrectly, the turn goes to the player you guessed.\n\nIf you guess correctly, the other player joins your empire and you get to guess again. \n\nThe game ends when one player is emperor of all others.'

export class Game extends Component {

  constructor (props) {
    super(props)
    global.answers.forEach((answer) => this.fuzzyset.add(answer));
    global.answers = global.answers.concat(this.getFakeAnswers());
    shuffle(global.answers);
  }

  fuzzyset = FuzzySet({useLevenshtein: false});

  userAnsweredAlready = (newAnswer) => {
    let check = this.fuzzyset.get(newAnswer, null, 0.4);
    return check;
  }

  getFakeAnswers = () => {
    let answers = QUESTIONS[global.questionIndex].answers;
    answers = answers.filter(answer => !this.userAnsweredAlready(answer));
    shuffle(answers);
    return answers.splice(0, global.numberFakes);
  }

  state = {
    showList: false,
    modalVisible: false,
  }

  toggleList = () => {
    this.setState({showList: !this.state.showList});
    this.scrollView.scrollTo({x: 0, y: 0, animated: false})
  }

  renderText = () => {
    if (this.state.showList) {
      return (
        <>
          {global.answers.map(answer =>
            <React.Fragment key={answer}>
              <Text
                  style={styles.answerText}
              >
                {answer}
              </Text>
              <View
                  style={styles.horizontalRule}
              />
            </React.Fragment>
          )}
        </>
      )
    } else {
      return(
        <Text style={styles.explanationText}>
          {explanationText}
        </Text>
      );
    }
  }

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  endGame = () => {
    global.answers = []
    this.setModalVisible(false);
    this.navigate('HomeScreen');
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
        >
          <View style={styles.modalView}>
            <View style={styles.modalSquare}>
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
                      onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>No, return</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View>
          <View style={styles.headerContainer}>
            <TouchableHighlight
                onPress={() => this.setModalVisible(true)}
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.listScrollView}
            ref={ref => this.scrollView = ref}
        >
          <View style={styles.listSection}>
            {this.renderText()}
          </View>
        </ScrollView>
        <View style={styles.sectionView}>
          <TouchableHighlight
              activeOpacity={1}
              onPress={this.toggleList}
              style={styles.button}
              underlayColor={Colors.DARK_BLUE}>
            <Text style={styles.buttonText}>
              {this.state.showList ? 'Hide List' : 'Show List'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Game;
