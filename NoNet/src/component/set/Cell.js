// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableHighlight, Switch } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Cell extends PureComponent {

  _onPress(item) {
    // this.props.onPress(item)
  }

  detail() {
    if (this.props.detail) {
      return (
        <Text style={styles.detail}>{this.props.detail}</Text>
      )
    }
  }
  next() {
    if (this.props.next) {
      return (
        <Image 
          style={styles.icon} 
          source={require('../../assets/images/arrow_next.png')}
        />
      )
    }
  }
  switch() {
    if (this.props.isSwitch == undefined || this.props.isSwitch == false) {
      return (
        <View style={styles.subview}>
          {this.detail()}
          {this.next()}
        </View>
      )
    } else {
      return (
        <Switch/>
      )
    }
  }
  render() {
    return (
      <TouchableHighlight underlayColor={'#666'} onPress={()=>this._onPress(this.props.item)}>
        <View style={styles.container}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          {this.switch()}
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
    fontFamily: 'Exo2-Regular',
  },
  detail: {
    fontSize: 12,
    color: 'rgba(150,150,150,1)',
    // fontWeight: '300',
    fontFamily: 'Exo2-ExtraLight',
  },
  icon: {
    width: 15,
    height: 15,
  }
});

export default Cell;