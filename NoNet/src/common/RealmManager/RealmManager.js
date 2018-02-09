import StorageManager from './StorageManager';

var Realm = require('realm');
var realm;
// 连接组件 
export default class RealmManager {

  //==================== 初始化 ====================//
  // 初始化数据
  static initialization() {
    console.log("开始初始化")
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
        weather: {type: 'string', default: 'sunny'},
      }
    });
    realm = new Realm({schema: schemas});
  }


  //==================== 日记 ====================//
  // 增日记
  static saveDiary(name, content, year, month, day, weather, photos) {
    RealmManager.loadMaxId((maxid)=>{
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
    })
  }
  // 查日记
  static loadDiary(filtered) {
    if (realm != undefined) {
      let persons = realm.objects('Diary');
      if (filtered != null) {
        let person = persons.filtered(filtered);
        console.log("AAA")
      }
      return persons;
    } else {
      return [];
    }
  }
  // 改日记
  static replaceDiary(id, name, content, year, month, day, time, photos) {
    realm.write(() => {
      realm.create('Diary', {
        id: id, 
        name: name, 
        weather: weather,
        photos: photos,
        content: content,
        year: year,
        month: month,
        day: day,
      }, true);
    })
  }
  // 删日记
  static removeDiary(filtered) {
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


  //==================== ID设置 ====================//
  // 获取最大ID
  static loadMaxId(block) {
    StorageManager.loadWithKey('MAXID', (data)=>{
      if (block) {
          block(data);
      }
    },(err)=>{
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
      RealmManager.loadMaxId((id)=>{
        StorageManager.saveWithKey('MAXID', id+1, null); 
      });
    }
  }
};