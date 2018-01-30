// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class Top extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
          <Text style={styles.text}>Top</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    // backgroundColor: 'red',
  },
  text: {
    height: 30,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 30,
  }
});

export default Top;