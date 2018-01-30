// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Cell extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>SectionHeader</Text>
        <View style={styles.subview}>
          <Text style={styles.detail}>SectionHeader</Text>
          <Image style={styles.icon}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(244,244,244,1)',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  subview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: 'rgba(50,50,50,1)',
  },
  detail: {
    fontSize: 16,
    color: 'rgba(50,50,50,1)',
    marginRight: 5,
  },
  icon: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
  }
});

export default Cell;