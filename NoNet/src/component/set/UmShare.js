// Default
import React, { Component, PureComponent } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';

class UmShare {
  // RN -> iOS 调用, Block回调
  static show=()=>{
    var UMShareNative = NativeModules.UMShareNative // 获取到模块
    UMShareNative.share({// 直接调用函数
        '姓名':'幽冥',
        '年龄':20,
        '法力':'200'
    },(error, strings) =>{
      console.log("error")
      console.log(error)
      console.log("strings")
      console.log(strings)
    })
  }
  
}



export default UmShare;