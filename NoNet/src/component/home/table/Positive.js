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

class Positive extends PureComponent {

  //=================== 设置 ===================//
  display(that) {
    this.refs.positive.setNativeProps({
      style: {
        opacity: 1
      },
      onPress: that.props.onPositive
    });
  }
  hidden() {
    this.refs.positive.setNativeProps({
      style: {
        opacity: 0,
      },
      onPress: undefined
    });
  }


  //=================== 控件 ===================//
  render() {
    return (
      <View ref={"positive"} style={styles.positive}>
        <View style={styles.calender}>
          <Text style={styles.month}>{this.props.month}</Text>
          <Text style={styles.day}>{DateManager.getMonthEn(this.props.month-1)}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Text style={styles.diarys}>0/31</Text>
            <View style={styles.lines}>
              <View style={styles.line}/>
              <View style={styles.noneline}/>
            </View>
          </View>
          <Image style={styles.icon} resizeMode={"contain"} source={require('../../../assets/images/icon_option.png')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  positive: {
    backgroundColor: '#87CEFA',
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  calender: {
  },
  month: {
    fontSize: 50,
    color: 'white',
    paddingLeft: 20,
    fontWeight: '200',
  },
  day: {
    fontSize: 25,
    color: 'white',
    paddingLeft: 20,
    fontWeight: '300',
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottomLeft: {
    flex: 1,
  },
  diarys: {
    color: 'white',
  },
  lines: {
    height: 3,
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 3,
    flexDirection: 'row',
  },
  line: {
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1,
    flex: 3,
  },
  noneline: {
    height: 3,
    backgroundColor: 'transparent',
    borderRadius: 1,
    flex: 27,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default Positive;
