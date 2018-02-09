// Default
import React, { PureComponent } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Animated, 
  ScrollView,
  ActionSheetIOS,
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, Swipe, KKInputHUD } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';


class Diary extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      yOffset: new Animated.Value(0),
    }
  }
  
  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _save=()=>{
    this.showActionSheet();
  }


  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Option 0',
        'Option 1',
        'Option 2',
        'Destruct',
        'Cancel',
      ],
      cancelButtonIndex: 4,
      destructiveButtonIndex: 3,
    },(buttonIndex) => {
      // this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        style={[styles.nav, {
          backgroundColor: this.state.yOffset.interpolate({//映射到0.0,1.0之间
            inputRange: [0, ScreenWidth / 5 * 3 - NAVIGATION_HEIGHT, ScreenWidth / 5 * 3],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)']
          })
        }]}
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
        assets={[]}
        addPress={this._onAddPress}
        removePress={this._onRemovePress}
      />
    )
  }
  content() {
    return (
      <ScrollView 
        style={styles.content}
        scrollEventThrottle={10}//onScroll回调间隔
        onScroll={
          Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.yOffset}}}]//把contentOffset.x绑定给this.state.xOffset
          )
        }
      >
        <View style={styles.subcontent}>
          <Text style={styles.date}>asdasdas</Text>
          <Text style={styles.name}>asdasdas</Text>
          <Image style={styles.weather} source={require('../../assets/images/weather_sunny_small.png')}/>
          <Text style={styles.detail}>请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯,请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯.请问大师第瓯江路可能就或I噢就离开那就开会欧咯,请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯</Text>
        </View>
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.content()}
        {this.swipe()}
        {this.nav()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: ScreenHeight
  },
  nav: {
    backgroundColor: 'white', 
    position: 'absolute'
  },
  swipe: {
    width: ScreenWidth,
    height: ScreenWidth / 5 * 3,
    backgroundColor: 'gray',
    position: 'absolute',
    overflow: 'hidden',
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
    fontWeight: '500',
    color: 'rgba(150,150,150,1)',
  },
  weather: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  detail: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: 'rgba(170,170,170,1)',
    fontWeight: '300',
    lineHeight: 23,
    textAlign: 'justify',
    marginTop: 15,
  }
});

// reducer
const mapStateToProps = state => ({
  DiaryReducer: state.DiaryReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DiaryAction: bindActionCreators(diaryAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
