import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { ScreenWidth } from '../../utils/index';
 
class Cell extends Component {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      borderWidth: 0,
      scaleValue: new Animated.Value(0)
    };
  }
  
  //==================== 点击 ====================//
  _onPress=()=>{
    this.show();
    this.props.onPress(this.props.item, this.state.borderWidth == 0 ? true : false);
    this.setState({
      borderWidth: this.state.borderWidth == 0 ? 5 : 0
    })
  }
  
  //==================== 动画 ====================//
  show() {
    Animated.timing(this.state.scaleValue,{
      toValue: 2,
      duration: 200,
      easing: Easing.linear
    }).start((result)=>{
      this.state.scaleValue.setValue(0);
    });
  }

  //==================== 数据 ====================//
  text() {
    let str = "";
    if (this.props.item.item.isSelect != 0) {
      str = this.props.item.item.isSelect;
    }
    // console.log(this.props.selectCount)
    // for (let i=0; i<this.props.selectCount.length; i++) {
    //   if (this.props.item.item.row == this.props.selectCount[i]) {
    //     str = i + 1
    //   }
    // }
    return str;
  }

  //==================== 控件 ====================//
  render() { 
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
        <Animated.View 
          style={[
            styles.container, 
            {
              borderWidth: this.state.borderWidth,
              transform: [{
                scale: this.state.scaleValue.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [1, 1.05, 1],
                })
              }] 
            }
          ]}
        >
          <Image style={[styles.icon, {borderRadius: this.state.borderWidth}]} source={{uri: this.props.item.item.node.image.uri}}/>
          <View style={[styles.number, {opacity: this.state.borderWidth == 5 ? 1 : 0}]}>
            <Text style={styles.name}>{this.text()}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    width: (ScreenWidth - 20) / 3,
    height: (ScreenWidth - 20) / 3,
    borderColor: 'orange',
    backgroundColor: 'orange',
  },
  icon: {
    flex: 1,
    borderRadius: 10,
  },
  number: {
    backgroundColor: 'orange',
    position: 'absolute',
    right: -5,
    top: -5,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  }
});

export default Cell;
