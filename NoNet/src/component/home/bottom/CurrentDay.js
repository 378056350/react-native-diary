// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class CurrentDay extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isDetail: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.top}>Today</Text>
        <Text style={styles.bottom}>JAN, 30/2018</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: 'rgba(222,222,222,1)',
    borderWidth: 1,
    height: 40,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
  },
  top: {
    fontSize: 9,
    color: 'rgba(170,170,170,1)'
  },
  bottom: {
    fontSize: 10,
    color: 'rgba(50,50,50,1)'
  }
});

export default CurrentDay;