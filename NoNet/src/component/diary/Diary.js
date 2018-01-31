// Default
import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';


class Diary extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      yOffset: new Animated.Value(0)
    }
  }
  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
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
        leftText={'返回'}
        leftClick={this._back}
      />
    )
  }
  diary() {
    let arr = [];
    for (let i=0; i<5; i++) {
      arr.push(
        <View style={{width: ScreenWidth, height: ScreenHeight}}>
          {this.swipe()}
          {this.content()}
        </View>
      )
    }
    return (
      <ScrollView 
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {arr}
      </ScrollView>
    );
  }
  swipe() {
    return (
      <Animated.Image 
        style={[styles.swipe, {
          transform: [{
            translateY: this.state.yOffset.interpolate({//映射到0.0,1.0之间
              inputRange: [-1000, 0, ScreenWidth / 5 * 3],
              outputRange: [1000, 0, -ScreenWidth / 5 * 2]
            })
          }]
        }]} 
        source={require('../../assets/images/swipe.png')}
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
          <Image style={styles.weather}/>
          <Text style={styles.detail}>请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯,请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯.请问大师第瓯江路可能就或I噢就离开那就开会欧咯,请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯请问大师第瓯江路可能就或I噢就离开那就开会欧咯</Text>
        </View>
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {/* {this.swipe()}
        {this.content()} */}
        {this.diary()}
        {this.nav()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nav: {
    backgroundColor: 'transparent', 
    position: 'absolute'
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
    color: TitleColor,
  },
  weather: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
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
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
