import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, Image } from 'react-native';

import * as Analytics from '../core/Analytics';
import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 26,
    marginTop: 40,
  },
  titleText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'Georgia',
    fontSize: 32,
    marginHorizontal: 32,
    marginVertical: 22,
  },
  rulesText: {
    color: Colors.BOLD_BLUE,
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    lineHeight: 24,
    margin: 32,
  },
});

const rulesText = "In Empire, players will answer a group question and will have to guess which player provided which answer. \n\nTo begin the game, press “Play” and pick one of the questions from the list.\n\nThen, each player thinks of her personal answer to that question. When a player is ready, she takes the phone and types in her answer.\n\nIf two players provide the same answer (or very similar answers), both of their answers will be removed and they must both enter in new answers.\n\nThe game begins once each player has entered her answer. At the start of the game, players read the answer list, which shows all of the answers plus a few fake answers that players did not choose.\n\nDecide which player will go first. That player attempts to match one of the answers with another player. For instance, if it is Helen’s turn, she could say “Alex, I think your answer is Cleopatra”. \n\nIf Helen was wrong, then Alex goes next and guesses any player. \n\nIf Helen was right, Alex joins her empire and Helen gets to guess again. \n\nAs empress, Helen can consult with Alex but Helen gets the final decision in guessing.\n\nIf another player correctly guesses Helen, Helen and her entire empire become part of that other player’s empire. \n\nThe winning player is whoever becomes emperor of all other players. \n";

export class Rules extends Component {
  navigate = (toScreen) => {
    Analytics.logEvent(Analytics.events.PAGE_CHANGE,
      {"fromPage": "RulesScreen", "toPage": toScreen});
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  goBack = () => {
    Analytics.logEvent(Analytics.events.PAGE_BACK,
      {"fromPage": "RulesScreen"});
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight
              onPress={() => this.goBack()}
              underlayColor={Colors.WHITE}
          >
            <Image source={require('../assets/backArrow.png')} />
          </TouchableHighlight>
        </View>
        <Text style={styles.titleText}>
          Rules
        </Text>
        <ScrollView>
          <Text style={styles.rulesText}>
            {rulesText}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default Rules
