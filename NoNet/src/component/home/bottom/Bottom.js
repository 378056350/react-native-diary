// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Utils
import { Button } from '../../../common/index';
import CurrentDay from './CurrentDay';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class Bottom extends PureComponent {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false
    }
  }

  //==================== 控件 ====================//
  _onChange=()=>{
    this.props.onChange(!this.state.isDetail);
    this.state.isDetail = !this.state.isDetail;
  }
  _edit=()=>{
    this.props.onEdit();
  }
  render() {
    return (
      <View style={styles.container}>
        <CurrentDay/>
        <View style={styles.subview}>
          <Button onPress={this._edit} customView={<Image style={{width: 40, height: 40}} source={require('../../../assets/images/home_edit.png')}/>}/>
          <Button style={styles.turn} onPress={this._onChange} customView={<Image style={{width: 40, height: 40}} source={require('../../../assets/images/home_edit.png')}/>}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  subview: {
    flexDirection: 'row',
  },
  turn: {
    marginLeft: 15,
  }
});

export default Bottom;