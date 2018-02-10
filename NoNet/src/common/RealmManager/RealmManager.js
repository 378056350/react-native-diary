import StorageManager from './StorageManager';

var Realm = require('realm');
var realm;
var realmListener = null;
// 连接组件 
export default class RealmManager {

  //==================== 初始化 ====================//
  // 初始化数据
  static initialization() {
    RealmManager.initializationRealm();
    StorageManager.initialization();
  }
  static initializationRealm() {
    let schemas = [];
    schemas.push({
      name: 'Diary',
      primaryKey: 'id',    
      properties: {
        id:      'int',
        name:    {type: 'string', default: ''},
        year:    {type: 'string', default: ''},
        month:   {type: 'string', default: ''},
        day:     {type: 'string', default: ''},
        photos:  'string[]',
        content: {type: 'string', default: ''},
        weather: {type: 'string', default: ''},
      }
    });
    realm = new Realm({schema: schemas});
  }


  //==================== 日记 ====================//
  // 增日记
  static saveDiary(name, content, year, month, day, weather, photos, callback) {
    // if (realmListener != null) {
    //   realmListener.remove();
    // }
    // realmListener = realm.addListener('change', () => {
    //   if (callback) {
    //     callback();
    //   }
    // });
    RealmManager.loadMaxId((maxid)=>{
      console.log("开始存储")
      realm.write(() => {
        realm.create('Diary', {
          id: maxid, 
          name: name, 
          weather: weather,
          photos: photos,
          content: content,
          year: year,
          month: month,
          day: day,
        });
      })
      RealmManager.saveMaxId(maxid + 1);
    });
  }
  // 查日记
  static loadDiary(filtered) {
    if (realm != undefined) {
      let persons = realm.objects('Diary');
      if (filtered != null) {
        let person = persons.filtered(filtered);
        return person;
      }
      return persons;
    } else {
      return [];
    }
  }
  // 改日记
  static replaceDiary(id, name, content, year, month, day, weather, photos) {
    console.log("正在更改")
    console.log(id);
    realm.write(() => {
      realm.create('Diary', {
        id: id, 
        name: name, 
        content: content,
        year: year,
        month: month,
        day: day,
        weather: weather,
        photos: photos,
      }, true);
    })
  }
  // 删日记
  static removeDiary(filtered, callback) {
    // if (realmListener != null) {
    //   realmListener.remove();
    // }
    // realmListener = realm.addListener('change', () => {
    //   if (callback) {
    //     callback();
    //   }
    // });
    realm.write(() => {
      // 获取Person对象
      let persons = realm.objects('Diary');
      if (filtered != null) {
        persons = persons.filtered(filtered);
      }
      // 删除
      realm.delete(persons);
    })
  }


  // 监听事件
  static becomeListener(callback) {
    if (realmListener != null) {
      realmListener.remove();
    }
    realmListener = realm.addListener('change', () => {
      console.log("回调")
      if (callback) {
        callback();
      }
    });
  }


  //==================== ID设置 ====================//
  // 获取最大ID
  static loadMaxId(block) {
    StorageManager.loadWithKey('MAXID', (data)=>{
      console.log("进来了1")
      if (block) {
        block(data);
      }
    },(err)=>{
      console.log("进来了2")
      if (block) {
          block(1);
      }
    });
  }
  // 获取最大ID
  static saveMaxId(id) {
    if (id != null) {
      StorageManager.saveWithKey('MAXID', id, null); 
    } else {
      RealmManager.loadMaxId((maxid)=>{
        StorageManager.saveWithKey('MAXID', maxid+1, null); 
      });
    }
  }
};