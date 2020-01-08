import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, ScrollView } from 'react-native';

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
    borderBottomWidth: 1.5,
    width: '100%',
  },
});

const explanationText = 'All players get to read the list of answers once at the start of the game.\n\nThe list can be shown again if all players agree to see it again.\n\nOn your turn, you guess by matching any answer to any player.\n\nIf you guess incorrectly, the turn goes to the player you guessed.\n\nIf you guess correctly, the other player joins your empire and you get to guess again. \n\nThe game ends when one player is emperor of all others.'

export class Game extends Component {

  state = {
    showList: true,
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
            <>
              <Text
                  style={styles.answerText}
                  key={answer}
              >
                {answer}
              </Text>
              <View style={styles.horizontalRule} />
            </>
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

  render() {
    return (
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
