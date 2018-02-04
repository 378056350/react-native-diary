
import StorageManager from './StorageManager';
var Realm = require('realm');
var realm;
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
        time:    {type: 'string', default: ''},
        photos:  'string[]',
        content: {type: 'string', default: ''},
        weather: {type: 'string', default: 'sunny'},
      }
    });
    realm = new Realm({schema: schemas});
  }


  //==================== 日记 ====================//
  // 写日记
  static saveDiary(id, name, content, weather, time, photos) {
    realm.write(() => {
      realm.create('Diary', {
        id: id, 
        name: name, 
        time: time,
        photos: photos,
        content: content,
        weather: weather,
      });
    })
  }
  // 获取日记
  static loadDiary(filtered) {
    let persons = realm.objects('Diary');
    if (filtered != null) {
      persons = persons.filtered(filtered);
    }
    return persons;
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
          block(0);
      }
    });
  }
  // 获取最大ID
  static saveMaxId() {
    RealmManager.loadMaxId((id)=>{
      StorageManager.saveWithKey('MAXID', id+1, null); 
    });
  }
};