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
import YearCell from './YearCell';
import WeatherCell from './WeatherCell';
import Line from '../Line/Line';
import DateManager from '../DateManager/DateManager';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor } from '../../utils/UIUtils';

export const HUD = {
  DATE: 2000,
  WEATHER: 500,
  COLOR: 0,
};

class KKInputHUD extends PureComponent {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(0),
      currentIndex: -1,
      icon: [
        require('../../assets/images/weather_sunny_big.png'),
        require('../../assets/images/weather_cloud_big.png'),
        require('../../assets/images/weather_rain_big.png'),
        require('../../assets/images/weather_snow_big.png'),
        require('../../assets/images/weather_light_big.png')
      ]
    }
  }

  setCurrentIndex(index) {
    this.state.currentIndex = index;
  }

  //==================== 动画 ====================//
  show() {
    this.setState({
      modalVisible: true
    })
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 1
    }).start((result)=>{
      
    });
  }
  hide(block) {
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      if (block) {
        block();
      }
      this.setState({
        modalVisible: false,
      })
    });
  }

  //==================== 数据 ====================//
  data() {
    let arr = [];
    if (this.props.type == HUD.DATE) {
      let year = DateManager.getYearList();
      for (let i=0; i<year.length; i++) {
        let isSelect = false;
        if (this.state.currentIndex != -1) {
          isSelect = i == this.state.currentIndex;
        } else {
          isSelect = DateManager.getYear() == year[i]
        }
        arr.push({key: i, year: year[i], isSelect: isSelect})
      }
    } 
    else if (this.props.type == HUD.WEATHER) {
      let weather = ["Sunny","Cloud","Rain","Snow","Lighting"];
      for (let i=0; i<weather.length; i++) {
        let isSelect = false;
        if (this.state.currentIndex != -1) {
          isSelect = i == this.state.currentIndex;
        } else {
          isSelect = i == 0
        }
        arr.push({key: i, weather: weather[i], isSelect: isSelect})
      }
    }
    return arr;
  }

  //==================== 点击 ====================//
  _onCellClick=(item)=>{
    if (this.props.type == HUD.DATE) {
      this.hide(()=>{
        this.state.currentIndex = item.key;
        this.props.onPress(item);
      });
    } 
    else if (this.props.type == HUD.WEATHER) {
      this.hide(()=>{
        this.state.currentIndex = item.key;
        this.props.onPress(item);
      });
    }
  }

  //==================== 控件 ====================//
  text() {
    if (this.props.type == HUD.DATE) {
      return "选择年份"
    } else if (this.props.type == HUD.WEATHER) {
      return "选择天气"
    } else if (this.props.type == HUD.COLOR) {
      return "选择颜色"
    }
  }
  bj() {
    return (
      <TouchableOpacity onPress={()=>this.hide()} activeOpacity={1} style={{flex: 1}}>
        <Animated.View style={[styles.bj, {
          opacity: this.state.opacity
        }]}/>
      </TouchableOpacity>
    )
  }
  top() {
    return (
      <View style={styles.top}>
        <Text style={styles.topLeft}>{this.text()}</Text>
        <TouchableOpacity style={styles.topRight} activeOpacity={0.8} onPress={()=>this.hide()}>
          <Text style={styles.topRightText}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }
  bottom() {
    return (
      <Animated.View style={[styles.bottom, {
        transform: [{
          translateY: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [ScreenHeight / 5 * 2, 0] 
          })
        }]
      }]}>
        {this.top()}
        <FlatList
          ref={"table"}
          data={this.data()}
          renderItem={({item}) => this._renderItem(item)}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          getItemLayout={(data, index) => ({length: ScreenHeight / 5 * 2 / 5, offset: ScreenHeight / 5 * 2 / 5 * index, index})}
        />
      </Animated.View>
    )
  }
  _renderItem=(item)=>{
    if (this.props.type == HUD.DATE) {
      let count = this.props.diarys[item.year];
      if (count != null) {
        count = count["array"].length;
      } else {
        count = 0;
      }
      return (
        <YearCell 
          item={item}
          count={count}
          onPress={this._onCellClick}
        />
      )
    } else if (this.props.type == HUD.WEATHER) {
      return (
        <WeatherCell 
          item={item}
          icon={this.state.icon[item.key]}
          onPress={this._onCellClick}
        />
      )
    } else if (this.props.type == HUD.COLOR) {
      return (
        <Text>COLOR</Text>
      )
    }
  }
  _ItemSeparatorComponent=()=>{
    return (
      <Line color={LineColor}/>
    )
  }
  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'none'}
        transparent = {true}
        onRequestClose={()=> this.onRequestClose()}
      >
        <View style={styles.container}>
          {this.bj()}
          {this.bottom()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: 'flex-end'
  },
  bj: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  bottom: {
    width: ScreenWidth,
    height: ScreenHeight / 5 * 2,
    backgroundColor: StreamColor,
  },
  top: {
    height: ScreenHeight / 5 * 2 / 5,
    width: ScreenWidth,
    borderBottomWidth: 1,
    borderBottomColor: LineColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  topLeft: {
    fontSize: 11,
    fontWeight: '300',
    color: 'gray'
  },
  topRight: {
    height: ScreenHeight / 5 * 2 / 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  topRightText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(50,50,50,1)',
  },
});

// 连接组件 
export default KKInputHUD;