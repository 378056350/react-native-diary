// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class ListFooter extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>V3.7@ 2018 Rhythmical Studio. All rights reserved</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(244,244,244,1)',
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  name: {
    fontSize: 10,
    color: 'rgba(150,150,150,1)'
  }
});

export default ListFooter;