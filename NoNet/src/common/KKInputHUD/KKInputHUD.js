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
import Line from '../Line/Line';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor } from '../../utils/UIUtils';

class KKInputHUD extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(0),
    }
  }
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
  hide() {
    Animated.timing(this.state.opacity,{ 
      duration: 300,
      easing: Easing.elastic(0),
      toValue: 0
    }).start((result)=>{
      this.setState({
        modalVisible: false,
      })
    });
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
          data={[{key: 'a'}, {key: 'b'},{key: 'c'}, {key: 'd'},{key: 'e'}, {key: 'f'}]}
          renderItem={({item}) => this._renderItem(item)}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
        />
      </Animated.View>
    )
  }
  top() {
    return (
      <View style={styles.top}>
        <Text style={styles.topLeft}>{this.props.text}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>this.hide()}>
          <Text style={styles.topRight}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderItem=(item)=>{
    return (
      <YearCell style={{height: ScreenHeight / 5 * 2 / 5}}/>
    )
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
    paddingRight: 15,
  },
  topLeft: {
    fontSize: 11,
    fontWeight: '300',
    color: 'gray'
  },
  topRight: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(50,50,50,1)'
  },
  table: {

  }
});


// 连接组件 
export default KKInputHUD;