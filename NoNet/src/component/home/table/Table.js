// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// 控件
import Top from '../top/Top';
import Card from './Card';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class Table extends Component {


  show(isDetail) {
    for (var i=0; i<12; i++) {
      this.refs["card"+i].show(isDetail)
    }
  }

  card=()=>{
    let arr = [];
    for (var i=0; i<12; i++) {
      arr.push (
        <Card ref={"card"+i} key={i}/>
      )
    }
    return arr;
  }
  render() {
    return (
      <View style={styles.contaner}>
        <ScrollView 
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