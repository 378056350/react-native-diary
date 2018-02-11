// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// Utils
import { Button, DateManager, Device } from '../../../common/index';
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
    this.setState({
      isDetail: !this.state.isDetail
    })
  }
  _edit=()=>{
    this.props.onEdit();
  }

  edit=()=>{
    let diarys = this.props.diarys;
    let year = DateManager.getYear();
    let month = DateManager.getMonth();
    let day = DateManager.getDay();
    if (diarys[year] != null && 
        diarys[year][month] != null &&
        diarys[year][month][day] != null) {
      
    } else {
      return (
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
      )
    }
  }
  calender=()=>{
    return (
      <Button 
        style={[styles.turn, styles.button, {
          backgroundColor: this.props.isDetail == true ? "#87CEFA" : 'rgba(50,50,50,1)',
          shadowColor: this.props.isDetail == true ? "#87CEFA" : 'rgba(50,50,50,1)',
        }]} 
        onPress={this._onChange} 
        customView={
          <Image 
            style={styles.icon} 
            resizeMode={"contain"}
            source={this.props.isDetail == false ? require('../../../assets/images/icon_calendar.png') : require('../../../assets/images/icon_turn_back.png')}
          />
        }
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <CurrentDay onPress={this.props.onPress}/>
        <View style={styles.subview}>
          {this.edit()}
          {this.calender()}
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
    shadowRadius: 2,
    ...Device.ifDevice({
      marginBottom: 20,
    },{
      marginBottom: 0,
    },{
      marginBottom: 0,
    }),
  },
  icon: {
    width: 15,
    height: 15,
  },
});

export default Bottom;