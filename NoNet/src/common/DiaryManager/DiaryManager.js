
import RealmManager from '../RealmManager/RealmManager';

// 连接组件 
export default class DiaryManager {

  // 获取年份
  static getDiary(year, month, day) {
    let str = "";
    if (year != null) {
      str = str + "year == " + year;
    }
    if (month != null) {
      str = str + "&& month == " + month;
    }
    if (day != null) {
      str = str + "&& day == " + day;
    }
    let arr = RealmManager.loadDiary(str);
    return arr;
  }
};