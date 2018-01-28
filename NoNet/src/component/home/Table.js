// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// 控件
import Card from './Card';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Table extends Component {

  card=()=>{
    let arr = [];
    for (var i=0; i<12; i++) {
      arr.push (
        <Card key={i}/>
      )
    }
    return arr;
  }
  render() {
    return (
      <View>
        <ScrollView 
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
  
});

export default Table;