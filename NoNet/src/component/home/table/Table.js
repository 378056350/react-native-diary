// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// 控件
import Top from '../top/Top';
import Card from './Card';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';
import DateManager from '../../../common/DateManager/DateManager';

class Table extends Component {

  getAnimated() {
    return this.refs["card"+1].getAnimated()
  }
  componentDidMount() {
    this.refs.scroll.scrollTo({
      x: (DateManager.getMonth() - 1) * (ScreenWidth - 80), 
      y: 0, 
      animated: false
    })
  }
  componentWillUpdate = (nextProps, nextState) => {
    let condition1 = nextProps.diarys != this.props.diarys;
    let condition2 = nextProps.currentYear != this.props.currentYear;
    if (condition1 || condition2 ) {
      return true;
    } 
    return false;
  }

  //==================== 动画 ====================//
  show(isDetail) {
    for (var i=0; i<12; i++) {
      this.refs["card"+i].show(isDetail)
    }
  }
  scrollWithIndex(index) {
    this.refs.scroll.scrollTo({
      x: index * (ScreenWidth - 80), 
      y: 0, 
      animated: true
    })
  }

  //==================== 数据 ====================//
  getCurrentMonth() {
  }

  //==================== 点击 ====================//
  _onPositive=(i)=>{
    this.props.onPositive(i);
  }
  _onOpposite=(day, month)=>{
    this.props.onOpposite(day, month);
  }

  //==================== 控件 ====================//
  card=()=>{
    let arr = [];
    for (let i=0; i<12; i++) {
      arr.push (
        <Card 
          ref={"card"+i} 
          key={i} 
          month={i+1}
          onPositive={()=>this._onPositive(i)} 
          onOpposite={this._onOpposite}
          currentYear={this.props.currentYear}
          diarys={this.props.diarys}
        />
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={styles.contaner}>
        <ScrollView 
          ref={"scroll"}
          style={styles.scroll}
          horizontal={true} 
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.card()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    // backgroundColor: 'orange',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    width: ScreenWidth - 80,
    // backgroundColor: 'red',
    overflow: 'visible'
  }
});

export default Table;