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
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { NAVIGATION_HEIGHT } from '../../component/tabbar/TabbarSetting';
// Common
import { ScreenWidth, ScreenHeight, StreamColor, BackDefaultColor } from '../../utils/index';
import { TitleColor } from '../../utils/UIUtils';

class Swipe extends Component {

  //==================== 系统 ====================//
  constructor(props) {  
    super(props);  
    this.state = {  
      currentIndex: 0
    };  
  }  

  //==================== 点击 ====================//
  _removePress=()=>{
    Alert.alert(
      '',
      '删除这张照片?',
      [
        {text: '取消', onPress: () => console.log(''), style: 'cancel'},
        {text: '删除', onPress: () => this.props.removePress(this.state.currentIndex)},
      ]
    )
  }

  //==================== 控件 ====================//
  swiper() {
    return (
      <Swiper 
        ref={"swiper"}
        activeDot={<View style={{backgroundColor: 'white', width: 6, height: 6, borderRadius: 3, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4,}} />}
        dot={<View style={{backgroundColor:'rgba(255,255,255,.4)', width: 6, height: 6, borderRadius: 3, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4,}} />}
        paginationStyle={{bottom: 10}}
        onIndexChanged={(index)=>{this.state.currentIndex = index}}
      >
        {this.swiperIcon()}
      </Swiper>
    )
  }
  swiperIcon() {
    let arr = [];
    if (this.props.assets.length == 0) {
      for (let i=0; i<2; i++) {
        arr.push (
          <View key={i} style={styles.slide}/>
        )
      }
    } else {
      for (let i=0; i<this.props.assets.length; i++) {
        arr.push (
          <Image 
            key={i} 
            style={styles.slide} 
            source={{'uri': this.props.assets[i], scale: 1}}
          />
        )
      }
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
        onPress={this._removePress}
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
      <Animated.View style={[this.props.style, {backgroundColor: 'rgba(200,200,200,1)'}]}>
        <Animated.View style={this.props.substyle}>
          {this.swiper()}
          <View 
            style={[styles.edit, {
              opacity: this.props.opacity && this.props.opacity == 1 ? 1 : 0
            }]} 
            pointerEvents={"box-none"}
          >
          {this.add()}
          {this.props.assets.length != 0 ? this.remove() : null}
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
    marginLeft: 10,
    marginRight: 10,
  },
  buttonImg: {
    width: ScreenWidth / 4 / 3, 
    height: ScreenWidth / 4 / 3
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Swipe.defaultProps = {
  assets: []
}
Swipe.propTypes = {
  assets: PropTypes.array.isRequired,
}

export default Swipe;
