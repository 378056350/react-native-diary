// 连接组件 
export default class DateManager {

  // 获取年份
  static getYearList() {
    let arr = [];
    let currentYear = DateManager.getYear();
    for (let i=currentYear-5; i<currentYear + 3; i++) {
      arr.push(i);
    }
    return arr;
  }




  /** 获取年 */
  static getYear() {
    var date = new Date();
    return date.getFullYear();
  }
  /** 获取月 */
  static getMonth() {
      var date = new Date();
      return date.getMonth() + 1;
  }
  /** 获取日 */
  static getDay() {
      var date = new Date();
      return date.getDate();
  }
  /** 获取星期几 */
  static getWeekday(y, m, d) {
    var l = ["日","一","二","三","四","五","六"];
    var d = new Date(y, m, d).getDay();
    return l[d];
  }
};