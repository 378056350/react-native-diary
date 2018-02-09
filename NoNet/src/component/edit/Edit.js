// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  PanResponder, 
  InteractionManager, 
  Easing, 
  Animated, 
  Keyboard, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Alert,
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, KeyboardAccess, KKInputHUD, HUD, Swipe, Toast, AutoExpandingTextInput, DateManager } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';

var that;
class Edit extends Component {
  
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
      yOffset: new Animated.Value(0),
      keyboardY: new Animated.Value(0),
      titleTop: 0,
      icon: [
        require('../../assets/images/weather_sunny_small.png'),
        require('../../assets/images/weather_cloud_small.png'),
        require('../../assets/images/weather_rain_small.png'),
        require('../../assets/images/weather_snow_small.png'),
        require('../../assets/images/weather_light_small.png')
      ],
      currentWeatherIndex: 0,
      keyboardH: 0,
      titleEditable: true,
      assets: [],
      name: ''
    };  
  }  
  componentWillMount () {
    that = this;
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      currentWeatherIndex: params.weather ? params.weather : 0,
      name: params.name,
    });
    this.refs.content.setText(params.content)
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
    that.state.keyboardH = event.endCoordinates.height;
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
  // 保存
  _save=()=>{
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    const { DiaryAction } = this.props;
    DiaryAction.saveDiarySaga({
      name: this.state.name, 
      content: this.refs.content.getContent(), 
      weather: this.state.currentWeatherIndex + "", 
      photos: this.state.assets,
      year: params.year+"",
      month: params.month+"",
      day: params.day+"",
    })
    setTimeout(() => {
      goBack();
      DiaryAction.loadDiarySaga();
    }, 1000);
  } 
  // 手指按下Scroll
  _onScrollStart=()=>{
    console.log("onScrollStart")
    that.setState({
      titleEditable: true
    })
    that.refs.content.enableEdit();
  }
  // 手指移动Scroll
  _onScrollMove=()=>{
    console.log("onScollMove")
    if (that.refs.content.isFocused() == false && 
        that.refs.title.isFocused() == false) {
      that.setState({
        titleEditable: false
      })
      that.refs.content.disableEdit();
    }
  }
  // 手指离开Scroll
  _onScrollEnd=()=>{
    console.log("onScrollEnd")

  }
  // 内容尺寸改变
  _onContentSizeChange() {
    that.refs.scroll.scrollToEnd();
  }
  // 点击完成
  _onFinish=()=>{
    this.refs.title.blur();
    this.refs.content.endEditing();
  }
  // 天气点击
  _onWeather=()=>{
    this.refs.hud.show();
  }
  // hud选择
  _onHudClick=(item)=>{
    this.setState({
      currentWeatherIndex: item.key,
    })
  }
  // 标题聚焦
  _onTitleFocus=()=>{
    if (this.state.keyboardH != 0) {
      var height1 = ScreenHeight - this.state.keyboardH - NAVIGATION_HEIGHT;
      var height2 = that.state.titleTop;
      that.refs.scroll.scrollTo({x: 0, y: height1 - height2});
    }
  }
  // 内容聚焦
  _onContentFocus=()=>{
    if (this.state.keyboardH != 0) {
      that.refs.scroll.scrollToEnd();
    }
  }
  // 添加图片
  _onAddPress=()=>{
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("Photo", {callback: (data)=>{
        this.setState({
          assets: data
        })
      }});
    })
  }
  // 删除图片
  _onRemovePress=(i)=>{
    InteractionManager.runAfterInteractions(() => {
      let arr = this.state.assets;
      arr.splice(i, 1)
      this.setState({
        assets: arr
      })
    })
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        style={styles.nav}
        leftIcon={require('../../assets/images/icon_back_arrow.png')}
        leftClick={this._back}
        rightText={"存储"}
        rightClick={this._save}
      />
    )
  }
  swipe() {
    return (
      <Swipe 
        opacity={1}
        style={[styles.swipe, {
          height: this.state.yOffset.interpolate({//映射到0.0,1.0之间
            inputRange: [-ScreenHeight, 0, ScreenWidth / 5 * 3, ScreenWidth / 5 * 30],
            outputRange: [ScreenWidth / 5 * 3, ScreenWidth / 5 * 3, 0, 0]
          }),
          transform: [{
            translateY: this.state.yOffset.interpolate({//映射到0.0,1.0之间
              inputRange: [-1000, 0, 1000],
              outputRange: [1000, 0, 0]
            })
          }]
        }]}
        substyle={{
          width: ScreenWidth,
          height: ScreenWidth / 5 * 3,
          transform: [{
            translateY: this.state.yOffset.interpolate({//映射到0.0,1.0之间
              inputRange: [-1000, 0, ScreenWidth / 5 * 3],
              outputRange: [0, 0, -ScreenWidth / 5 * 2]
            })
          }]
        }}
        addPress={this._onAddPress}
        removePress={this._onRemovePress}
        assets={this.state.assets}
      />
    )
  }
  content() {
    const { params } = this.props.navigation.state;
    let date = DateManager.getDateStr(params.year, params.month, params.day);
    return (
      <ScrollView 
        scrollEventThrottle={10}
        onTouchStart={this._onScrollStart}
        onTouchMove={this._onScrollMove}
        onTouchEnd={this._onScrollEnd}
        ref={"scroll"}
        style={styles.content}
        scrollEventThrottle={10}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.yOffset}}}],
          // {listener: this._handleScroll},
        )}
      >
        <View style={styles.subcontent}>
          <Text style={styles.date}>{date}</Text>
          <TextInput 
            style={styles.name} 
            editable={this.state.titleEditable} 
            ref={"title"} 
            onFocus={this._onTitleFocus} 
            autoCorrect={false} 
            placeholder={"标题"} 
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            onLayout={this._onTitleLayout}
          />
          <TouchableOpacity activeOpacity={1} style={styles.weather} onPress={this._onWeather}>
            <Image style={{flex: 1, width: 25}} resizeMode={"contain"} source={this.state.icon[this.state.currentWeatherIndex]}/>
          </TouchableOpacity>
          <AutoExpandingTextInput  
            placeholder={"写下你的今天..."}
            onFocus={this._onContentFocus}
            ref={"content"}
            style={styles.detail} 
            autoCorrect={false}
            onContentSizeChange={this._onContentSizeChange} 
          />   
        </View>
      </ScrollView>
    )
  }
  hud() {
    return (
      <KKInputHUD 
        ref={"hud"} 
        type={HUD.WEATHER} 
        onPress={this._onHudClick}
      />
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
        ]}
      >
        {this.content()}
        {this.swipe()}
        {this.nav()}
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
    position: 'absolute',
  },
  content: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: LineColor,
  },
  swipe: {
    width: ScreenWidth,
    position: 'absolute',
    top: NAVIGATION_HEIGHT,
    overflow: 'hidden'
  },
  subcontent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: ScreenWidth / 5 * 3 + NAVIGATION_HEIGHT,
  },
  date: {
    fontSize: 9,
    color: 'rgba(200,200,200,1)',
    fontWeight: '400',
  },
  name: {
    fontSize: 16,
    width: ScreenWidth - 40,
    height: 20,
    color: TitleColor,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  weather: {
    width: 25,
    height: 25,
    marginTop: 10,
  },
  detail: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: 'rgba(170,170,170,1)',
    fontWeight: '400',
    lineHeight: 23,
    textAlign: 'justify',
    marginTop: 15,
    width: ScreenWidth - 40,
    height: 200,
  },
  ketaccess: {
    position: 'absolute',
    top: 0,
  }
});

Edit.defaultProps = {
  assets: []
}
Edit.propTypes = {
  assets: PropTypes.array,
}

// reducer
const mapStateToProps = state => ({
  DiaryReducer: state.DiaryReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DiaryAction: bindActionCreators(diaryAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
