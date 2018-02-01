// Default
import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, Easing, Animated, Keyboard, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, KeyboardAccess, KKInputHUD, HUD, Toast, AutoExpandingTextInput } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';

var that;
class Edit extends PureComponent {
  
  //==================== 系统 ====================//
  static navigationOptions = {
    mode: 'modal',
    gesturesEnabled: false,
  };
  constructor(props) {  
    super(props);  
    this.state = {  
      text: '',  
      height: 0,
      keyboardY: new Animated.Value(0),
      titleTop: 0,
    };  
  }  
  componentWillMount () {
    that = this;
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }
  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  //==================== 监听 ====================//
  _keyboardWillShow (event) {
    Animated.timing(that.state.keyboardY,{
      toValue: event.endCoordinates.height,
      duration: event.duration,
      easing: Easing.linear
    }).start((result)=>{
      
    });
  }
  _keyboardDidShow (event) {
    if (that.refs.title.isFocused() == true) {
      var height1 = ScreenHeight - event.endCoordinates.height - NAVIGATION_HEIGHT;
      var height2 = that.state.titleTop;
      that.refs.scroll.scrollTo({x: 0, y: height1 - height2})
    } else {
      that.refs.scroll.scrollToEnd();
    }
  }
  _keyboardWillHide (event) {
    Animated.timing(that.state.keyboardY,{
      toValue: 0,
      duration: event.duration,
      easing: Easing.linear
    }).start((result)=>{
      
    });
  }
  _onTitleLayout=(event)=>{
    this.state.titleTop = event.nativeEvent.layout.y + event.nativeEvent.layout.height + ScreenWidth / 5 * 3;
  }

  //==================== 点击 ====================//
  // 返回
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  // 改变文本
  _onChangeText(newText) {  
    console.log('inputed text:' + newText);  
  }  
  // 内容尺寸改变
  _onContentSizeChange() {
    that.refs.scroll.scrollToEnd();
  }
  // 点击完成
  _onFinish=()=>{
    // Keyboard.dismiss()
    this.refs.title.blur();
    this.refs.content.endEditing();
  }
  // 天气点击
  _onWeather=()=>{
    this.refs.hud.show();
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        style={styles.nav}
        leftText={'返回'}
        leftClick={this._back}
      />
    )
  }
  content() {
    return (
      <ScrollView 
        ref={"scroll"}
        style={styles.content}
        scrollEventThrottle={10}
      >
        <Image 
          style={styles.swipe} 
          source={require('../../assets/images/swipe.png')}
        />
        <View style={styles.subcontent}>
          <Text style={styles.date}>asdasdas</Text>
          <TextInput style={styles.name} ref={"title"} autoCorrect={false} placeholder={"标题"} onLayout={this._onTitleLayout}/>
          <TouchableOpacity activeOpacity={1} style={styles.weather} onPress={this._onWeather}>
            <Image style={{flex: 1}}/>
          </TouchableOpacity>
          <AutoExpandingTextInput  
            ref={"content"}
            style={styles.detail} 
            autoCorrect={false}
            onChangeText={(newText)=>{this._onChangeText(newText)}} 
            onContentSizeChange={this._onContentSizeChange} 
          />   
        </View>
      </ScrollView>
    )
  }
  hud() {
    return (
      <KKInputHUD ref={"hud"} type={HUD.WEATHER}/>
    )
  }
  ketaccess() {
    return (
      <KeyboardAccess 
        onPress={this._onFinish}
        style={[styles.ketaccess, {
          transform: [{
            translateY: this.state.keyboardY.interpolate({
              inputRange: [0, ScreenHeight],
              outputRange: [ScreenHeight - 45, -45],
            })
          }],
          opacity: this.state.keyboardY.interpolate({
            inputRange: [0, 216, ScreenHeight],
            outputRange: [0, 1, 1],
          })
        }]}/>
    )
  }
  render() {
    return (
      <Animated.View style={[styles.container,{
        height: this.state.keyboardY.interpolate({
          inputRange: [0, ScreenHeight],
          outputRange: [ScreenHeight, -90],
        })}
      ]}>
        {this.nav()}
        {this.content()}
        {this.ketaccess()}
        {this.hud()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: ScreenHeight,
  },
  nav: {
    backgroundColor: 'white', 
  },
  swipe: {
    width: ScreenWidth,
    height: ScreenWidth / 5 * 3,
    backgroundColor: 'gray',
    position: 'absolute',
  },
  content: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: LineColor,
  },
  subcontent: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: ScreenWidth / 5 * 3,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: 'rgba(170,170,170,1)'
  },
  name: {
    fontSize: 18,
    width: ScreenWidth - 40,
    backgroundColor: 'red',
    height: 20,
    color: TitleColor,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '400',
  },
  weather: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    marginTop: 10,
  },
  detail: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: 'rgba(170,170,170,1)',
    fontWeight: '300',
    lineHeight: 23,
    textAlign: 'justify',
    marginTop: 15,
    backgroundColor: 'gray',
    width: ScreenWidth - 40,
    height: 200,
  },
  ketaccess: {
    position: 'absolute',
    top: 0,
  }
});

// reducer
const mapStateToProps = state => ({
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
