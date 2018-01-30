import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ScreenWidth, ScreenHeight } from '../../utils/index';
import { StreamColor } from '../../utils/UIUtils';

class YearCell extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>2018</Text>
      </View>
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
    color: 'gray'
  }
});


// 连接组件 
export default YearCell;