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

const DURATION = 250;
const CARD_WIDTH = ScreenWidth - 90;
const CARD_HEIGHT = CARD_WIDTH / 5 * 8;

// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../utils/index';

class Card extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
      isAnimated: false
    }
  }

  componentDidMount() {
    this.refs.subview.shadowOpacity = 5;
  }

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
        this.refs.positive.setNativeProps({
          style: {
            opacity: 0,
          }
        });
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
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 5
        }
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
        this.refs.positive.setNativeProps({
          style: {
            opacity: 1
          }
        });
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
      this.refs.subview.setNativeProps({
        style: {
          shadowRadius: 5
        }
      });
    });
  }

  positive() {
    return (
      <View ref={"positive"} style={styles.positive}></View>
    )
  }
  opposite() {
    return (
      <View ref={"opposite"} style={styles.opposite}></View>
    )
  }
  shadow() {
    return (
      <Animated.View ref={"shadow"} style={[styles.shadow, {
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
            {this.opposite()}
            {this.positive()}
            {this.shadow()}
        </Animated.View>
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
  positive: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
  },
  opposite: {
    backgroundColor: '#87CEFA',
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
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
