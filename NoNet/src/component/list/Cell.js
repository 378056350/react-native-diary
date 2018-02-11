// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';

class Cell extends Component {

  constructor(props) {  
    super(props);  
    this.state = {  
      icon: [
        require('../../assets/images/weather_sunny_small.png'),
        require('../../assets/images/weather_cloud_small.png'),
        require('../../assets/images/weather_rain_small.png'),
        require('../../assets/images/weather_snow_small.png'),
        require('../../assets/images/weather_light_small.png')
      ],
    };  
  }  

  content() {
    if (this.props.item.photos.length != 0) {
      return (
        <Image 
          style={styles.pic} 
          source={{'uri': this.props.item.photos[0], scale: 1}}
        />
      )
    } else {
      return (
        <View style={styles.content}>
          <Image style={styles.contentT} source={require('../../assets/images/diary_top.png')}/>
          <View style={styles.contentC}>
            <Text numberOfLines={3} style={styles.contentText}>{this.props.item.content}</Text>
          </View>
          <Image style={styles.contentB} source={require('../../assets/images/diary_down.png')}/>
        </View>
      )
    }
  }

  left() {
    return (
      <View style={styles.left}>
        <Text style={styles.name}>{this.props.item.day}</Text>
        <Text style={styles.detail}>{DateManager.getWeekday(this.props.item.year,this.props.item.month,this.props.item.day)[1]}</Text>
        <Image style={styles.icon} source={this.state.icon[this.props.item.weather]}/>
      </View>
    )
  }
  right() {
    return (
      <View style={styles.right}>
        {this.content()}
      </View>
    )
  }
  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.subview}>
            {this.left()}
            {this.right()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ScreenWidth / 5 * 3,
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: StreamColor,
  },
  subview: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: LineColor,
  },
  name: {
    fontSize: 36,
  },
  detail: {
    fontSize: 10,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 5,
  },

  right: {
    flex: 2.5,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  contentT: {
    width: 20,
    height: 20,
  },
  contentC: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 12,
    fontWeight: '300',
    color: TitleColor,
  },
  contentB: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  pic: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default Cell;