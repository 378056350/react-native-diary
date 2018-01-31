// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableHighlight } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Cell extends PureComponent {

  _onPress(item) {
    // this.props.onPress(item)
  }

  render() {
    return (
      <TouchableHighlight underlayColor={'#666'} onPress={()=>this._onPress(this.props.item)}>
        <View style={styles.container}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <View style={styles.subview}>
            <Text style={styles.detail}>SectionHeader</Text>
            <Image style={styles.icon} source={require('../../assets/images/arrow_next.png')}/>
          </View>
        </View>
      </TouchableHighlight>
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
    fontSize: 15,
    color: 'rgba(50,50,50,1)',
  },
  detail: {
    fontSize: 12,
    color: 'rgba(150,150,150,1)',
    fontWeight: '300'
  },
  icon: {
    width: 15,
    height: 15,
  }
});

export default Cell;