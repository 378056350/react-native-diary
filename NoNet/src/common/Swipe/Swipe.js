// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Modal, 
  Animated,
  TouchableOpacity, 
  TouchableHighlight, 
} from 'react-native';
import Swiper from 'react-native-swiper';
import { NAVIGATION_HEIGHT } from '../../component/tabbar/TabbarSetting';
// Common
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';
import { TitleColor } from '../../utils/UIUtils';

class Swipe extends Component {

  //==================== 控件 ====================//
  swiper() {
    return (
      <Swiper 
        activeDot={<View style={{backgroundColor: 'white', width: 6, height: 6, borderRadius: 3, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4,}} />}
        dot={<View style={{backgroundColor:'rgba(255,255,255,.4)', width: 6, height: 6, borderRadius: 3, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4,}} />}
        paginationStyle={{bottom: 10}}
      >
        {this.swiperIcon()}
      </Swiper>
    )
  }
  swiperIcon() {
    let arr = [];
    for (let i=0; i<3; i++) {
      arr.push (
        <View key={0} style={styles.slide1}>
          <Text style={styles.text}>{i}</Text>
        </View>
      )
    }
    return arr;
  }
  add() {
    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={styles.button}
        onPress={this.props.addPress}
      >
        <Image 
          style={styles.buttonImg} 
          source={require('../../assets/images/edit_add.png')}
        />
      </TouchableOpacity>
    )
  }
  remove() {
    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={styles.button}
        onPress={this.props.removePress}
      >
        <Image 
          style={styles.buttonImg} 
          source={require('../../assets/images/edit_remove.png')}
        />
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <Animated.View style={this.props.style}>
        <Animated.View style={this.props.substyle}>
          {this.swiper()}
          <View 
            style={[styles.edit, {
              opacity: this.props.opacity && this.props.opacity == 1 ? 1 : 0
            }]} 
            pointerEvents={"box-none"}
          >
            {this.add()}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    width: ScreenWidth,
    height: ScreenWidth / 5 * 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: ScreenWidth / 4,
    height: ScreenWidth / 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImg: {
    width: ScreenWidth / 4 / 3, 
    height: ScreenWidth / 4 / 3
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});


export default Swipe;
