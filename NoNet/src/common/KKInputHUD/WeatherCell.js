import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScreenWidth, ScreenHeight } from '../../utils/index';
import { StreamColor } from '../../utils/UIUtils';

class WeatherCell extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subview}>
          <Image style={styles.icon}/>
          <Text style={styles.text}>2018</Text>
        </View>
        <Image style={styles.next}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ScreenHeight / 5 * 2 / 5,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  subview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },  
  text: {
    color: 'gray',
    marginLeft: 10,
  },
  next: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
});


// 连接组件 
export default WeatherCell;