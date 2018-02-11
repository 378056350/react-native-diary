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

let CalenderComponent = null;
class Opposite extends PureComponent {
  
  //=================== 系统 ===================//
  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
    }
  }
  componentDidMount() {
    // 界面
    this.timer = setTimeout(()=>{
      if (CalenderComponent == null) {
        CalenderComponent = require('../../../common/index').Calender;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },2000);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  //=================== 控件 ===================//
  CalenderComponent() {
    return (
      <CalenderComponent 
        style={styles.calender}
        month={this.props.month}
        currentYear={this.props.currentYear}
        onPress={this.props.onCalenderPress}
        diarys={this.props.diarys}
      />
    )
  }
  render() {
    return (
      <View ref={"opposite"} style={[styles.opposite, {
        transform: [{
          rotateY: '180deg'
        }]
      }]}>
        <Text style={styles.number}>{this.props.month}</Text>
        <Text style={styles.month}>{DateManager.getMonthEn(this.props.month-1)}</Text>
        {this.state.needsComponent ? this.CalenderComponent() : null}
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
    color: 'rgba(100,100,100,1)',
    fontFamily: 'Exo2-Regular'
  },
  month: {
    fontSize: 15,
    fontWeight: '100',
    color: 'rgba(100,100,100,1)',
    marginTop: 5,
    fontFamily: 'Exo2-ExtraLight'
  },
  calender: {
    flex: 1,
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
