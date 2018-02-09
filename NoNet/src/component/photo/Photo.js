import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  CameraRoll,
  ListView,
  FlatList,
  DeviceEventEmitter,
  TextInput,
  Platform,
  LayoutAnimation,
  ScrollView,
  Switch
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';  
// 控件
import PhotoCell from './PhotoCell';
import CameraCell from './CameraCell';
import { Navigation, ThirdPicker, KeyboardAccess, KKInputHUD, HUD, Swipe, PhotoManager, Toast, AutoExpandingTextInput } from '../../common/index';
// action
import { diaryAction } from '../../redux/action/index';
import { StreamColor } from '../../utils/index';
import ImgToBase64 from 'react-native-image-base64';
import { ScreenWidth } from '../../utils/index';
var ReadImageData = require('NativeModules').ReadImageData;
var CustomLayoutAnimation = {
  duration: 200,
    create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  }
};

var that;
class Photo extends Component {

  //==================== 系统 ====================//
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      // 是否在读取
      loaded: false,
      // 是否没有更多数据
      noMore: true,
      // 读取相册的标识
      lastCursor: null,
      // 相册数据
      photoAsset: [],
      // 拍照数据
      cameraAsset: [],
      // 选中图片
      assets: [],
    };
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
  componentDidMount() {
    this.state.loaded = true;
    that = this;
    PhotoManager.fetchData(5, this.state.lastCursor, this._appendAssets);
  }
  componentDidUpdate() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
  }
  turnBase64Icons(i, arr, block) {
    // 图片转完
    if (i >= this.state.assets.length) {
      block(arr)
    } 
    // 图片没有转完
    else {
      let asset = this.state.assets[i];
      // 不是base64
      if (asset.item.node.image.uri.indexOf("assets-library") != -1) {
        ReadImageData.readImage(asset.item.node.image.uri, "0.1", (imageBase64) => {
          let str = "data:image/jpeg;base64," + imageBase64;
          this.turnBase64Icons(i + 1, [...arr, str], block);
        });
      } 
      // 是base64
      else {
        this.turnBase64Icons(i + 1, [...arr, asset], block);
      }
    }
  }

  //==================== 点击 ====================//
  // 返回
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  // 保存
  _save=()=>{
    this.refs.toast.show(1000);
    let arr = this.turnBase64Icons(0, [], (arr)=>{
      const {goBack, state} = this.props.navigation;
      state.params.callback(arr);
      console.log(arr);
      goBack();
    });
  }
  // 选中照片
  _onItemPress=(item, isSelect)=>{
    item.item.isBase64 = false;
    // 超过9张
    if (this.state.assets.length >= 9 && isSelect == false) {
      this.refs.toast.show(1000);
    }
    // 少于9张
    else {
      // 添加到拍照
      if (item.section == 1) {
        let arr = this.state.cameraAsset;
        arr[item.item.row].isSelect = !isSelect;
        this.setState({
          cameraAsset: arr
        })
      } 
      // 添加到相册
      else {
        let arr  = this.state.photoAsset;
        arr[item.item.row].isSelect = !isSelect;
        this.setState({
          photoAsset: arr
        })
      }
      // 当前是添加
      if (isSelect == false) {
        this.state.assets.push(item);
      }
      // 当前是删除
      else {
        let arr = [];
        for (let i=0; i<this.state.assets.length; i++) {
          if (!PhotoCell.equalData(this.state.assets[i], item)) {
            arr.push(this.state.assets[i]);
          }
        }
        this.setState({
          assets: arr
        })
      }
      DeviceEventEmitter.emit('Cell'+item.item.section+""+item.item.row, '通知来了');
    }
  }
  // 拍照
  _onCameraPress=()=>{
    ImagePicker.openCamera({  
      width: 300,  
      height: 400,  
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.5
    }).then(image => {
      let newIcon = {node: {image: {uri: "data:image/" + image.mime + ";base64," + image.data}}};
      newIcon.isSelect = 0;
      newIcon.section = 1;
      let assetsArr = [newIcon, ...this.state.cameraAsset];
      let arr = [];
      for (let i=0; i<assetsArr.length; i++) {
        let asset = assetsArr[i];
        asset.key = i + this.state.assets.length;
        asset.row = i + this.state.assets.length;
        asset.section = 2;
        asset.isBase64 = true;
        arr.push(asset);
      }
      this.setState({
        cameraAsset: arr
      })
    });
  }
  // 相册
  _appendAssets=(data, noMore)=>{
    var assets = data.edges;
    if (assets.length > 0) {
      let assetsArr = [];
      for (let i=0; i<assets.length; i++) {
        let asset = assets[i];
        asset.key = i + this.state.assets.length;
        asset.row = i + this.state.assets.length;
        asset.section = 2;
        asset.isSelect = 0;
        assetsArr.push(asset);
      }
      this.setState({
        photoAsset: [...this.state.photoAsset, ...assetsArr],
        noMore: noMore,
        loaded: false,
        lastCursor: data.page_info.end_cursor,
      })
    } 
    else {
      this.setState({
        loaded: false
      })
    }
  }
  // 滚动到底部
  _contentViewScroll(event){
    var offsetY = event.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      if (that.state.loaded == true) {
        return;
      }
      if(!that.state.noMore) {
        that.state.loaded = true;
        PhotoManager.fetchData(5, that.state.lastCursor, that._appendAssets);
      }
    }
  }

  //==================== 控件 ====================//
  // 导航
  nav=()=>{
    return (
      <Navigation 
        style={styles.nav}
        leftText={'取消'}
        leftClick={this._back}
        rightText={"完成"}
        rightClick={this._save}
      />
    )
  }
  // 拍照
  camera=()=>{
    return (
      <CameraCell onPress={this._onCameraPress}/>
    )
  }
  // 拍照
  cameraView() {
    let arr = [];
    for (let i=0; i<this.state.cameraAsset.length; i++) {
      arr.push(
        <PhotoCell 
          key={10000+i}
          item={{item: this.state.cameraAsset[i]}}
          onPress={this._onItemPress}
          assets={this.state.assets}
        />
      )
    }
    return arr;
  }
  // 相册
  photoView() {
    let arr = [];
    for (let i=0; i<this.state.photoAsset.length; i++) {
      arr.push(
        <PhotoCell 
          key={i}
          item={{item: this.state.photoAsset[i]}}
          onPress={this._onItemPress}
          assets={this.state.assets}
        />
      )
    }
    return arr;
  }
  // 提示
  toast=()=>{
    return (
      <Toast ref={"toast"} text={"抱歉哦, 最多9张图片啦"}/>
    )
  }
  // 滚动视图
  scroll=()=>{
    return (
      <ScrollView 
        style={styles.scroll}
        onMomentumScrollEnd = {this._contentViewScroll}
      >
        <View style={styles.subview}>
          {this.camera()}
          {this.cameraView()}
          {this.photoView()}
        </View>
      </ScrollView>
    )
  }
  render() { 
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.scroll()}
        {this.toast()}
      </View>
    );
  }
}

// 样式定义
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: StreamColor,
   },
   row: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
   },
   load: {
    flex: 1,
   },
   scroll: {
    flex: 1
   },
   subview: {
    flexDirection: 'row',
    width: ScreenWidth + 15,
    flexWrap: 'wrap',
   }
});

// reducer
const mapStateToProps = state => ({
  DiaryReducer: state.DiaryReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DiaryAction: bindActionCreators(diaryAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
