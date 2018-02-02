// Default
import React, { Component, PureComponent } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Easing, 
  Text, 
  View, 
  Animated, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  InteractionManager 
} from 'react-native';
// Utils
import { DateManager } from '../../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

const DURATION = 250;
const CARD_WIDTH = ScreenWidth - 90;
const CARD_HEIGHT = CARD_WIDTH / 5 * 8;

class Opposite extends PureComponent {

  //=================== 控件 ===================//
  render() {
    return (
      <View ref={"opposite"} style={[styles.opposite, {
        transform: [{
          rotateY: '180deg'
        }]
      }]}>
        <Text style={styles.number}>{this.props.month}</Text>
        <Text style={styles.month}>{DateManager.getMonthEn(this.props.month-1)}</Text>
        <View style={styles.calender}></View>
        <Text style={styles.detail}>从选中的日子写</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  opposite: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  number: {
    fontSize: 40,
    fontWeight: '300',
  },
  month: {
    fontSize: 15,
    fontWeight: '100',
    color: 'rgba(100,100,100,1)',
    marginTop: 5,
  },
  calender: {
    flex: 1,
    backgroundColor: 'red',
    width: ScreenWidth - 80 - 40,
    marginTop: 10,
    marginBottom: 10,
  },
  detail: {
    fontSize: 9,
    fontWeight: '300',
    color: 'rgba(150,150,150,1)'
  }
  
});

export default Opposite;
