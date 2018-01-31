// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class SectionHeader extends PureComponent {

  name() {
    if (this.props.name) {
      return (
        <Text style={styles.name}>{this.props.name}</Text>
      )
    }
  }
  detail() {
    if (this.props.detail && this.props.detail.length != 0) {
      return (
        <Text style={styles.detail}>{this.props.detail}</Text>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.name()}
        {this.detail()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(244,244,244,1)',
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 12,
    color: 'rgba(150,150,150,1)',
  },
  detail: {
    fontSize: 11,
    color: 'rgba(150,150,150,1)',
    marginTop: 20,
  }
});

export default SectionHeader;