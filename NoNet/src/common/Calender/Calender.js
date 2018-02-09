import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateManager from '../DateManager/DateManager';
import { ScreenWidth, ScreenHeight, StreamColor, } from '../../utils/index';

class Calender extends PureComponent {

  //==================== 数据 ====================//
  days() {
    let arr = [];
    // 年份
    let year = this.props.currentYear;
    // 月份
    let month = this.props.month;
    // 开始时周几
    let startDay = DateManager.getWeek(year, month);
    // 天数
    let days = DateManager.getDaysInOneMonth(year, month);
    for (let i=1-startDay; i<=days; i++) {
      // 颜色
      let color = "";
      // 周几
      let week = i+startDay-1;
      // 是否是今天
      let isToday = year == DateManager.getYear() && month == DateManager.getMonth() && i == DateManager.getDay()
      if (this.props.diarys != undefined && 
          this.props.diarys[year] != undefined && 
          this.props.diarys[year][month] != undefined && i >= 0 && 
          this.props.diarys[year][month][i] != undefined) {
        if (week % 7 == 0) {
          color = 'rgba(255,105,180,1)'
        } else if (week % 7 == 6) {
          color = 'rgba(30,144,255,1)'
        } else {
          color = 'rgba(0,0,0,0.7)'
        }
      } else {
        if (week % 7 == 0) {
          color = 'rgba(255,192,203,1)'
        } else if (week % 7 == 6) {
          color = 'rgba(135,206,250,1)'
        } else {
          color = 'rgba(0,0,0,0.3)'
        }
      }
      
      arr.push (
        this.DayComponent(i, month, color, isToday)
      )
    }
    return arr;
  }
  
  //==================== 控件 ====================//
  DayComponent(day, month, color, isToday) {
    return (
      <TouchableOpacity key={day} activeOpacity={1} onPress={()=>this.props.onPress(day, month)}>
        <View 
          style={[styles.day, {
            opacity: day > 0 ? 1 : 0,
          }]}
        >
          <Text style={[styles.name, {
            color: color
          }]}>{day}</Text>
          <View style={[styles.line, {
            opacity: isToday == true ? 1 : 0
          }]}/>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        {this.days()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  day: {
    width: (ScreenWidth - 80 - 40 - 10) / 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(100,100,100,1)'
  }
});

// 连接组件 
export default Calender;