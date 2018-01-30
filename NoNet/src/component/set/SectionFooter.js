// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';
import { LineColor } from '../../utils/UIUtils';

class SectionFooter extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: LineColor,
    paddingTop: 15,
  },
});

export default SectionFooter;