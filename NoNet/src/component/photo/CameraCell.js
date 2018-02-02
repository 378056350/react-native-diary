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
        <Image 
          source={require('../../assets/images/photo.png')}
          resizeMode={"contain"}
          style={styles.icon}
        />
      </View>
    )
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    width: (ScreenWidth - 20) / 3,
    height: (ScreenWidth - 20) / 3,
    backgroundColor: 'rgba(233,233,233,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: (ScreenWidth - 20) / 3 / 3,
    height: (ScreenWidth - 20) / 3 / 3,
  }
});

export default CameraCell;
