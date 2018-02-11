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
  Alert,
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, RealmManager, Toast, Swipe, KKInputHUD } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';


class Diary extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      yOffset: new Animated.Value(0),
      icon: [
        require('../../assets/images/weather_sunny_small.png'),
        require('../../assets/images/weather_cloud_small.png'),
        require('../../assets/images/weather_rain_small.png'),
        require('../../assets/images/weather_snow_small.png'),
        require('../../assets/images/weather_light_small.png')
      ],
      diary: {
        name: '',
        weather: 0,
        year: '0',
        month: '0',
        day: '0',
        photos: [],
        content: ''
      }
    }
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    let diaryArr = RealmManager.loadDiary("year == '" + params.year + "' && month == '" + params.month + "' && day == '" + params.day + "'");
    if (diaryArr.length != 0) {
      this.setState({
        diary: diaryArr[0]
      })
    }
  }
  componentWillUpdate = (nextProps, nextState) => {
    let condition1 = nextState.diary != this.state.diary && nextState.diary.name != undefined;
    if (condition1) {
      return true;
    }
    return false;
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
        '编辑',
        '删除',
        '取消',
      ],
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1,
    },(buttonIndex) => {
      if (buttonIndex == 0) {
        this.clickOne()
      } else if (buttonIndex == 1) {
        this.clickTwo()
      }
    });
  }
  clickOne() {
    const { navigate } = this.props.navigation;
    let diary = this.state.diary;
    navigate("Edit", {
      id: diary.id,
      name: diary.name,
      year: diary.year,
      month: diary.month,
      day: diary.day,
      content: diary.content,
      weather: diary.weather,
      photos: diary.photos,
      type: 1,
    });
  }
  clickTwo() {
    Alert.alert(
      '你确定要删除这篇日记吗?',
      '你不能撤销这个操作',
      [
        {text: '删除', onPress: this.removeDiary, style: 'cancel'},
        {text: '取消', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }
  removeDiary=()=>{
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    const { DiaryAction } = this.props;
    this.state.diary = {
      name: undefined,
      weather: 0,
      year: '0',
      month: '0',
      day: '0',
      photos: [],
      content: '',
    }

    let filtered = "year == '" + params.year + "' && month == '" + params.month + "' && day == '" + params.day + "'";
    RealmManager.removeDiary(filtered, ()=>{
      DiaryAction.loadDiarySaga();
      goBack();
    }) 
    // DiaryAction.removeDiarySaga({
    //   filtered: "year == '" + params.year + "' && month == '" + params.month + "' && day == '" + params.day + "'",
    //   callback: ()=>{
    //     goBack();
    //     DiaryAction.loadDiarySaga();
    //   }
    // });
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
        rightIcon={require('../../assets/images/icon_option_gray.png')}
        rightClick={this._save}
      />
    )
  }
  swipe() {
    if (this.state.diary && this.state.diary.photos.length != 0) {
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
          assets={this.state.diary.photos}
          addPress={this._onAddPress}
          removePress={this._onRemovePress}
        />
      )
    } else {
      return (
        <View/>
      )
    }
  }
  content() {
    let date = DateManager.getDateStr(this.state.diary.year,this.state.diary.month,this.state.diary.day);
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
        <View style={[styles.subcontent, {
          marginTop: this.state.diary.photos.length != 0 ? ScreenWidth / 5 * 3 : NAVIGATION_HEIGHT,
        }]}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.name}>{this.state.diary.name}</Text>
          <Image style={styles.weather} source={this.state.icon[this.state.diary.weather]}/>
          <Text style={styles.detail}>{this.state.diary.content}</Text>
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
    height: ScreenHeight,
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
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
  },
  date: {
    fontSize: 9,
    color: 'rgba(200,200,200,1)',
    // fontWeight: '400',
    fontFamily: 'Exo2-Regular',
  },
  name: {
    fontSize: 16,
    width: ScreenWidth - 40,
    height: 20,
    color: TitleColor,
    textAlign: 'center',
    marginTop: 5,
    // fontWeight: '500',
    fontFamily: 'Exo2-Bold',
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
    paddingBottom: 40,
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
