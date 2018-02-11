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
import { DateManager, Button, DiaryManager } from '../../../common/index';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

const DURATION = 250;
const CARD_WIDTH = ScreenWidth - 90;
const CARD_HEIGHT = CARD_WIDTH / 5 * 8;

class Positive extends PureComponent {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      // 选择年份
      pointerEvents: 'auto'
    }
  }

  //=================== 设置 ===================//
  display(that) {
    this.refs.positive.setNativeProps({
      style: {
        opacity: 1
      },
      onPress: that.props.onPositive
    });
    this.setState({
      pointerEvents: 'auto'
    })
  }
  hidden() {
    this.refs.positive.setNativeProps({
      style: {
        opacity: 0,
      },
      onPress: undefined
    });
    this.setState({
      pointerEvents: 'none'
    })
  }

  //=================== 点击 ===================//
  _onColor=()=>{
  }

  //=================== 控件 ===================//
  render() {
    let month = DateManager.getDaysInOneMonth(this.props.currentYear, this.props.month);
    let diary = 0;
    if (this.props.diarys[this.props.currentYear] != null) {
      if (this.props.diarys[this.props.currentYear][this.props.month] != null) {
        diary = this.props.diarys[this.props.currentYear][this.props.month]["array"].length;
      }
    }
    
    return (
      <View ref={"positive"} pointerEvents={this.state.pointerEvents} style={styles.positive}>
        <View style={styles.calender}>
          <Text style={styles.month}>{this.props.month}</Text>
          <Text style={styles.day}>{DateManager.getMonthEn(this.props.month-1)}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Text style={styles.diarys}>{diary}/{month}</Text>
            <View style={styles.lines}>
              <View style={[styles.line, {
                flex: diary
              }]}/>
              <View style={[styles.noneline, {
                flex: month
              }]}/>
            </View>
          </View>
          <Button 
            customView={<Image style={styles.icon} resizeMode={"contain"} source={require('../../../assets/images/icon_option.png')}/>}
            onPress={this._onColor}
          />
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
    fontFamily: 'Exo2-ExtraLight'
  },
  day: {
    fontSize: 25,
    color: 'white',
    paddingLeft: 20,
    fontFamily: 'Exo2-Regular'
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
    fontFamily: 'Exo2-Regular'
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
  },
  noneline: {
    height: 3,
    backgroundColor: 'transparent',
    borderRadius: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default Positive;
