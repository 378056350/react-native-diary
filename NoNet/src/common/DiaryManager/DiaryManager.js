
import RealmManager from '../RealmManager/RealmManager';

// 连接组件 
export default class DiaryManager {

  // 获取年份
  static getDiary(diarys, year, month, day) {
    let arr = [];
    if (diarys) {
      for (let i=0; i<diarys.length; i++) {
        if (year != null && diary[i].year == year) {
          if (month != null && diary[i].month == month) {
            if (day != null && diary[i].day == day) {
              arr.push(diarys[i])
            }
          }
        }
      }
      return arr;
    } else {
      return [];
    }
  }
};