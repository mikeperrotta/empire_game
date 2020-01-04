import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

import { Colors } from '../core/styles/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  headerContainer: {
    marginTop: 34,
    marginLeft: 16,
  }
});

export class Rules extends Component {
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
              style={styles.button}
              underlayColor={Colors.WHITE}>
            <Image source={require('../assets/backArrow.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Rules
