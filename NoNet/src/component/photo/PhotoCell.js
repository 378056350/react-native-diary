import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  DeviceEventEmitter
} from 'react-native';
import { ScreenWidth } from '../../utils/index';
 
class PhotoCell extends PureComponent {

  static equalData(data1, data2) {
    if (data1.item.node.image.uri == data2.item.node.image.uri) {
      return true;
    }
    return false;
  }

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      name: 0,
      scaleValue: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('Cell'+this.props.item.item.section+""+this.props.item.item.row, (userName) =>{
      this.text();
    })
  }
  componentWillUnmount() {
    this.subscription.remove();
  };
  
  //==================== 点击 ====================//
  _onPress=()=>{
    // 超过9张
    if (this.props.assets.length > 8) {
      this.props.onPress(this.props.item, this.props.item.item.isSelect);
    }
    // 
    else {
      this.show();
      this.props.onPress(this.props.item, this.props.item.item.isSelect);
    }
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
    this.setState({
      name: str,
    })
  }
  name() {
    for (let i=0; i<this.props.assets.length; i++) {
      if (PhotoCell.equalData(this.props.assets[i], this.props.item)) {
        return i+1;
      }
    }
    return ""
  }

  //==================== 控件 ====================//
  _onLoad=()=>{
    this.refs.cell.setNativeProps({
      backgroundColor: '#87CEFA',
    })
  }
  content() {
    return (
      <Animated.View 
        ref={"cell"}
        style={[styles.container, {
          borderWidth: this.props.item.item.isSelect == true ? 3 : 0,
          transform: [{
            scale: this.state.scaleValue.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 1.05, 1],
            })
          }] 
        }]}
      >
        <Image 
          style={[styles.icon, {borderRadius: this.props.item.item.isSelect == true ? 3 : 0}]} 
          source={{uri: this.props.item.item.node.image.uri, scale: 1}}
          onLoad={this._onLoad}
        />
        <View style={[styles.number, {opacity: this.props.item.item.isSelect == true ? 1 : 0}]}>
          <Text style={styles.name}>{this.name()}</Text>
        </View>
      </Animated.View>
    )
  }
  render() { 
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._onPress}>
        {this.content()}
      </TouchableOpacity>
    )
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    width: (ScreenWidth - 20) / 3,
    height: (ScreenWidth - 20) / 3,
    borderColor: '#87CEFA',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  icon: {
    flex: 1,
    borderRadius: 10,
  },
  number: {
    backgroundColor: '#87CEFA',
    position: 'absolute',
    right: -3,
    top: -3,
    width: 25,
    height: 25,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  }
});

export default PhotoCell;
