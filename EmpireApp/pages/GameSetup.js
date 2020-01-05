import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../core/styles/Colors';
import QUESTIONS from '../assets/Questions';

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
        <View>
          <FlatList
              data={QUESTIONS}
              keyExtractor={question => question.question}
              snapToInterval={55}
              renderItem={({ item, index }) => <QuestionObject index={index} question={item.question} />}
              showsVerticalScrollIndicator={false}
              style={styles.questionPicker}
          />
          <LinearGradient
              colors={[Colors.WHITE_HALF_TRANSPARENT, Colors.WHITE_TRANSPARENT, Colors.WHITE_HALF_TRANSPARENT]}
              pointerEvents='none'
              style={styles.linearGradient}
          />
        </View>
      </View>
    );
  }
}

export default GameSetup
