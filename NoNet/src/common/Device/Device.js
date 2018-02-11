

import { Platform, Dimensions} from 'react-native';
import RealmManager from '../RealmManager/RealmManager';

// 连接组件 
export default class Device {

  static isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812)
    );
  }
  static ifIphoneX(iphoneX, regular) {
    if (Device.isIphoneX()) {
        return iphoneX;
    } else {
        return regular;
    }
  }

  static ifDevice(iphoneX, iosRegular, android) {
    if (Platform.OS == 'ios') {
      return Device.ifIphoneX(iphoneX, iosRegular)
    } else {
      return android;
    }
  }
};