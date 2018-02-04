// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// 控件
import Top from '../top/Top';
import Card from './Card';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class Table extends Component {

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

  //==================== 点击 ====================//
  _onPositive=(i)=>{
    this.props.onPositive(i);
  }
  _onOpposite=(i)=>{
    this.props.onOpposite(i);
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
          onOpposite={()=>this._onOpposite(i)}
          currentYear={this.props.currentYear}
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