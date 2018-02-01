import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  Easing
} from 'react-native';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/UIUtils';

class KeyboardAccess extends PureComponent {

  render() {
    return (
      <Animated.View style={[this.props.style, styles.container]}>
        <Text style={styles.name}>标题</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.finish} onPress={this.props.onPress}>
          <Text style={styles.finishText}>完成</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: ScreenWidth,
    backgroundColor: StreamColor,
    borderTopWidth: 1,
    borderTopColor: 'rgba(220,220,220,1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220,220,220,1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'rgba(150,150,150,1)',
    fontWeight: '300',
    fontSize: 12,
  },
  finish: {
    position: 'absolute',
    right: 0,
    paddingLeft: 25,
    paddingRight: 15,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishText: {
    color: TitleColor,
    fontSize: 14,
    fontWeight: '500',
  }
});


// 连接组件 
export default KeyboardAccess;