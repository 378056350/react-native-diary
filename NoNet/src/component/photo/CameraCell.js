import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  DeviceEventEmitter
} from 'react-native';
import { ScreenWidth } from '../../utils/index';
 
class CameraCell extends Component {

  render() { 
    return (
      <View style={styles.container}>
        <Text>qweqwe</Text>
      </View>
    )
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    width: (ScreenWidth - 20) / 3,
    height: (ScreenWidth - 20) / 3,
    borderColor: 'orange',
    backgroundColor: 'orange',
  },
});

export default CameraCell;
