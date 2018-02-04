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
          <View style={styles.content}>
            <Text style={styles.text}>{this.props.name}</Text>
            <Image style={styles.icon} resizeMode={"contain"} source={require('../../../assets/images/icon_arrow_down.png')}/>
          </View>
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
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 5,
    lineHeight: 30,
    color: 'rgba(75,75,75,1)',
    fontWeight: '500',
  },
  icon: {
    width: 12,
    height: 12,
  }
});

export default Top;