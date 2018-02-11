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
import Positive from './Positive';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

const DURATION = 250;
const CARD_WIDTH = ScreenWidth - 90;
const CARD_HEIGHT = CARD_WIDTH / 5 * 8;

let OppositeComponent = null;
class Card extends PureComponent {

  //=================== 初始化 ===================//
  constructor(props) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
      isAnimated: false,
      isPositive: true,
      needsComponent: false,
    }
  }
  componentDidMount() {
    this.refs.subview.shadowOpacity = 5;
    // 界面
    this.timer = setTimeout(()=>{
      if (OppositeComponent == null) {
        OppositeComponent = require('./Opposite').default;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },2000);
  }
  componentWillUpdate = (nextProps, nextState) => {
    let condition1 = nextState.isPositive != this.state.isPositive;
    let condition2 = nextState.isAnimated != this.state.isAnimated;
    let condition3 = nextState.rotateValue != this.state.rotateValue;
    if (condition1 || condition2|| condition3) {
      return false;
    } 
    return true;
  }
  getAnimated() {
    return this.state.isAnimated
  }

  //==================== 点击 ====================//
  _onPress=()=>{
    if (this.state.isPositive == true) {
      this.props.onPositive();
    } else {
      // this.props.onOpposite();
    }
  } 
  _onCalenderPress=(day, month)=>{
    this.props.onOpposite(day, month);
  }

  //==================== 动画 ====================//
  show(SHOW) {
    if (this.state.isAnimated == false) {
      if (SHOW == true) {
        this.hidePositive();
      } else {
        this.hideOpposite();
      }
    }
  }
  hidePositive() {
    InteractionManager.runAfterInteractions(() => {
      this.state.rotateValue.setValue(0);
      this.state.isAnimated = true;
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 0
        }
      });
      Animated.timing(this.state.rotateValue,{
        toValue: 90,
        duration: DURATION,
        easing: Easing.linear
      }).start((result)=>{
        this.refs.positive.hidden();
        this.showOpposite();
      });
    })
  }
  showOpposite() {
    this.state.rotateValue.setValue(90);
    Animated.timing(this.state.rotateValue,{
      toValue: 180,
      duration: DURATION,
      easing: Easing.linear
    }).start((result)=>{
      this.state.isAnimated = false;
      this.state.isPositive = false;
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 5
        },
      });
    });
  }
  hideOpposite() { 
    InteractionManager.runAfterInteractions(() => {
      this.state.rotateValue.setValue(180);
      this.state.isAnimated = true;
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 0
        }
      });
      Animated.timing(this.state.rotateValue,{
        toValue: 270,
        duration: DURATION,
        easing: Easing.linear
      }).start((result)=>{
        // this.refs.positive.setNativeProps({
        //   style: {
        //     opacity: 1
        //   },
        //   onPress: this.props.onPositive
        // });
        this.refs.positive.display(this);
        this.showPositive();
      });
    })
  }
  showPositive() {
    this.state.rotateValue.setValue(270);
    Animated.timing(this.state.rotateValue,{
      toValue: 360,
      duration: DURATION,
      easing: Easing.linear
    }).start((result)=>{
      this.state.isAnimated = false;
      this.state.isPositive = true;
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 5
        }
      });
    });
  }

  //==================== 控件 ====================//
  positive() {
    return (
      <Positive 
        ref={"positive"}
        month={this.props.month}
        currentYear={this.props.currentYear}
        diarys={this.props.diarys}
      />
    )
  }
  opposite() {
    return (
      <OppositeComponent 
        ref={"opposite"}
        month={this.props.month}
        currentYear={this.props.currentYear}
        onCalenderPress={this._onCalenderPress}
        diarys={this.props.diarys}
      />
    )
  }
  shadow() {
    return (
      <Animated.View pointerEvents={"none"} ref={"shadow"} style={[styles.shadow, {
        opacity: this.state.rotateValue.interpolate({
            inputRange: [0, 90, 180, 270, 360],
            outputRange: [0, 0.3, 0, 0.3, 0],
        })
      }]} />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
          <Animated.View ref={"subview"} style={[styles.subview,{
            transform: [
                //透视
                {perspective: 1500},
                {scale: 0.9},
                //3d 旋转
                {
                    rotateY: this.state.rotateValue.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg','360deg'],
                    })
                },
                {
                    scale: this.state.rotateValue.interpolate({
                        inputRange: [0, 90, 180, 270, 360],
                        outputRange: [1, 0.95, 1, 0.95, 1]})     
                },
                {
                    translateY: this.state.rotateValue.interpolate({
                        inputRange: [0, 90, 180, 270, 360],
                        outputRange: [0, 5, 0, 5, 0]}) 
                }
            ]
          }]}>
            {this.state.needsComponent ? this.opposite() : null}
            {this.positive()}
            {this.shadow()}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subview: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
  },
  shadow: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
  }
});

export default Card;
