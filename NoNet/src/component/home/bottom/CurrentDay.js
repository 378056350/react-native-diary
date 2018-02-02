// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { DateManager } from '../../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class CurrentDay extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isDetail: false
    }
  }
  text() {
    let month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    let str = month[DateManager.getMonth()+1] + ", "+DateManager.getMonth()+"/"+DateManager.getYear();
    return str;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.top}>Today</Text>
        <Text style={styles.bottom}>{this.text()}</Text>
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
    paddingLeft: 35,
    paddingRight: 35,
    justifyContent: 'center',
  },
  top: {
    fontSize: 9,
    color: 'rgba(170,170,170,1)'
  },
  bottom: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(50,50,50,1)'
  }
});

export default CurrentDay;