// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Easing, Text, View, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

// 时间
export const SHOW_TYPE = {
  SHOW_POSITION: 0,   // 正面
  SHOW_OPPOSITE: 1,   // 反面
};

class Card extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isPosition: SHOW_TYPE.SHOW_POSITION,
      translateX: new Animated.Value(0)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.show(SHOW_TYPE.SHOW_OPPOSITE);
    }, 2000);
  }

  show(SHOW_TYPE) {
    Animated.timing(this.state.translateX,{ 
      duration: this.state.translateX,
      easing: Easing.elastic(0),
      toValue: 90
    }).start((result)=>{
      
    });
  }

  positive() {
    return (
      <View style={[styles.positive, {
        flex: this.state.isPosition == SHOW_TYPE.SHOW_POSITION ? 1 : 0,
      }]}></View>
    )
  }
  opposite() {
    return (
      <View style={[styles.opposite, {
        flex: this.state.isPosition == SHOW_TYPE.SHOW_OPPOSITE ? 1 : 0
      }]}></View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.subview,{
          transform:[{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }]
        }]}>
          {this.positive()}
          {this.opposite()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subview: {
    width: ScreenWidth / 3 * 2,
    height: ScreenWidth / 3 * 2 / 4 * 5,
    justifyContent: 'center',
  },
  positive: {
    backgroundColor: 'orange',
  },
  opposite: {
    backgroundColor: 'green',
  }
});

export default Card;