import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import { ScreenWidth, ScreenHeight } from '../../utils/index';
import { StreamColor } from '../../utils/UIUtils';

class WeatherCell extends PureComponent {

  next() {
    if (this.props.item.isSelect == true) {
      return (
        <Image style={styles.next} source={require('../../assets/images/weather_check.png')}/>
      )
    }
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor={'rgba(200,200,200,1)'} 
        onPress={()=>this.props.onPress(this.props.item)}
      >
        <View style={styles.container}>
          <View style={styles.subview}>
            <Image style={styles.icon} source={this.props.icon}/>
            <Text style={styles.text}>{this.props.item.weather}</Text>
          </View>
          {this.next()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ScreenHeight / 5 * 2 / 5,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  subview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },  
  text: {
    color: 'rgba(50,50,50,1)',
    marginLeft: 10,
  },
  next: {
    width: 20,
    height: 20,
  },
});


// 连接组件 
export default WeatherCell;