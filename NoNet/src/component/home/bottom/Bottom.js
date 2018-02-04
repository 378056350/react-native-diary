// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
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
        <CurrentDay onPress={this.props.onPress}/>
        <View style={styles.subview}>
          <Button 
            style={styles.button} 
            onPress={this._edit} 
            customView={
              <Image 
                style={styles.icon} 
                resizeMode={"contain"}
                source={require('../../../assets/images/icon_pencil.png')}
              />
            }
          />
          <Button 
            style={[styles.turn, styles.button]} 
            onPress={this._onChange} 
            customView={
              <Image 
                style={styles.icon} 
                resizeMode={"contain"}
                source={require('../../../assets/images/icon_calendar.png')}
              />
            }
          />
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
    alignItems: 'center',
  },
  turn: {
    marginLeft: 15,
  },
  button: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(50,50,50,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  icon: {
    width: 15,
    height: 15,
  },
});

export default Bottom;