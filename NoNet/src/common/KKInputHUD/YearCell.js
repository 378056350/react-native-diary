import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { ScreenWidth, ScreenHeight } from '../../utils/index';
import { StreamColor } from '../../utils/UIUtils';

class YearCell extends PureComponent {

  render() {
    return (
      <TouchableHighlight 
        underlayColor={'rgba(200,200,200,1)'} 
        onPress={()=>this.props.onPress(this.props.item)}
      >
        <View style={styles.container}>
          <Text style={[styles.text, this.props.item.isSelect == true && {
            color: 'black'
          }]}>
            {this.props.item.year}({this.props.count})
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenHeight / 5 * 2 / 5
  },
  text: {
    color: 'gray',
    // fontWeight: '400',
    fontFamily: 'Exo2-Bold',
  }
});


// 连接组件 
export default YearCell;