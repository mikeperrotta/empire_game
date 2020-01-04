import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
});

export class GameSetup extends Component {
  navigate = (toScreen) => {
    const { navigation } = this.props;
    navigation.navigate(toScreen)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> GameSetup </Text>
      </View>
    );
  }
}

export default GameSetup
