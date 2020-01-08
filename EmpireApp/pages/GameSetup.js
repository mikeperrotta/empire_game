import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../core/styles/Colors';
import QUESTIONS from '../assets/Questions';

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
  sectionView: {
    alignItems: 'center',
  },
  titleText: {
    marginVertical: 10,
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
  },
  questionPicker: {
    height: 270,
  },
  question: {
    alignItems: 'center',
    height: 55,
  },
  questionText: {
    textAlign: 'left',
    width: 192,
    fontSize: 14,
    marginVertical: 10,
  },
  horizontalRule: {
    borderBottomColor: Colors.BOLD_BLUE,
    borderBottomWidth: 1,
    width: 160,
  },
  questionPickerMargins: {
    height: 110,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  next: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.BOLD_BLUE,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    marginTop: 12,
    width: 328,
  },
  buttonArrow: {
    height: 20,
    width: 20,
  },
});

function QuestionObject({ index, question }) {
  return (
    <>
      {
        index === 0 && (
          <View style={styles.questionPickerMargins} />
        )
      }
      <View
          style={styles.question}>
        <Text
            style={[styles.explanationText, styles.questionText]}>
          {question}
        </Text>
        {index < QUESTIONS.length - 1 && (
            <View
                style={styles.horizontalRule}
            />
          )
        }
      </View>
      {
        index === QUESTIONS.length - 1 && (
          <View style={styles.questionPickerMargins} />
        )
      }
    </>
  );
}

const numberQuestionsShowing = 5;

export class GameSetup extends Component {

  selectedQuestionIndex = 0;

  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen);
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const indices = viewableItems.map(item => item.index);
    let middleIndex = 2;
    if (indices[0] === 0 && indices.length < numberQuestionsShowing) {
      // If the first question is showing, we will have
      // fewer than numberQuestionsShowing showing due to the
      // white space above the question. We should adjust
      // the middleIndex appropriately.
      middleIndex -= (numberQuestionsShowing - indices.length);
    }
    this.selectedQuestionIndex = indices[middleIndex];
  }

  next = () => {
    global.questionIndex = this.selectedQuestionIndex;
    this.navigate('NumberFakesScreen');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableHighlight
                onPress={() => navigation.goBack()}
                underlayColor={Colors.WHITE}>
              <Image source={require('../assets/backArrow.png')} />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => this.navigate('RulesScreen')}
                underlayColor={Colors.WHITE}>
              <Image
                  style={{ height: 50, width: 47 }}
                  source={require('../assets/questionMark2x.png')}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.titleText}>
            Question
          </Text>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.explanationText}>
            Pick a question. Each player will answer this question.
          </Text>
        </View>
        <View style={styles.sectionView}>
          <FlatList
              data={QUESTIONS}
              keyExtractor={question => question.question}
              onViewableItemsChanged={this.onViewableItemsChanged}
              renderItem={({ item, index }) => <QuestionObject index={index} question={item.question} />}
              showsVerticalScrollIndicator={false}
              snapToInterval={55}
              style={styles.questionPicker}
          />
          <LinearGradient
              colors={[
                Colors.WHITE_HALF_TRANSPARENT,
                Colors.WHITE_THREE_QUARTER_TRANSPARENT,
                Colors.WHITE_TRANSPARENT,
                Colors.WHITE_THREE_QUARTER_TRANSPARENT,
                Colors.WHITE_HALF_TRANSPARENT
              ]}
              pointerEvents='none'
              style={styles.linearGradient}
          />
        </View>
        <View style={styles.sectionView}>
          <TouchableHighlight
              activeOpacity={1}
              onPress={this.next}
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

export default GameSetup;
