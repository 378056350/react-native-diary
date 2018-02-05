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
  LayoutAnimation
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
import { dataAction } from '../../redux/action/index';
import { StreamColor } from '../../utils/index';
import ImgToBase64 from 'react-native-image-base64';
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

class Photo extends Component {

  //==================== 系统 ====================//
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      photos: [],
      noMore: true,
      lastCursor: null,
      // [0, 1, 2]
      selectCount: [],
      photoCount: []
    };
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
  componentDidMount() {
    this.state.loaded = true;
    PhotoManager.fetchData(5, this.state.lastCursor, this._appendAssets);
  }
  componentDidUpdate() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
  }
  // 请求更多图片
  _onLoadMore=()=>{
    if (this.state.loaded == true) {
      return;
    }
    if(!this.state.noMore) {
      this.state.loaded = true;
      PhotoManager.fetchData(5, this.state.lastCursor, this._appendAssets);
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
    const {goBack, state} = this.props.navigation;
    state.params.callback(this.state.photoCount);
    goBack();
  }
  // 选中照片
  _onItemPress=(item, isSelect)=>{
    // 超过9张
    if (this.state.selectCount.length > 8 && isSelect == true) {
      this.refs.toast.show(1000)
      return;
    }
    // 点击操作
    if (isSelect == true) {
      this.state.selectCount.push(item.item.row);
      this.state.photoCount.push(item.item.node.image.uri);
      this.state.photos[item.item.row].isSelect = this.state.selectCount.length;
      DeviceEventEmitter.emit('Cell'+item.item.row, '通知来了');
    } else {
      this.state.selectCount.pop();
      this.state.photoCount.pop();
      for (let i=0; i<this.state.photos.length; i++) {
        if (this.state.photos[i].isSelect > this.state.photos[item.item.row].isSelect) {
          this.state.photos[i].isSelect -= 1;
          DeviceEventEmitter.emit('Cell'+i, '通知来了');
        }
      }
      this.state.photos[item.item.row].isSelect = 0;
    }
    this.setState({
      selectCount: this.state.selectCount
    })
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
      this._onRefreshIcon([newIcon, ...this.state.photos]);
    });
  }
  // 相册获取图片
  _appendAssets=(data, noMore)=>{
    var assets = data.edges;
    if (assets.length > 0) {
      let assetsArr = [];
      for (let i=0; i<assets.length; i++) {
        let asset = assets[i];
        asset.key = i + this.state.photos.length;
        asset.row = i + this.state.photos.length;
        asset.isSelect = 0;
        assetsArr.push(asset);
      }
      // console.log(assetsArr)
      // if (assetsArr.length == 5) {
      //   console.log("进来了")
      //   console.log(assetsArr[0].node.image.uri);
      //   // ImgToBase64.getBase64String(assetsArr[0].node.image.uri).then(base64String => {
      //   //   console.log("base64: " + base64String);
      //   // }).catch(err => {
      //   //   console.log("err: " + base64String);
      //   // });
      //   // ReadImageData.readImage(assetsArr[0].node.image.uri, (imageBase64) => this._turnBase64);
      // }

      // this.setState({
      //   photos: [...this.state.photos, ...assetsArr],
      //   noMore: noMore,
      //   lastCursor: data.page_info.end_cursor,
      //   loaded: false
      // })
      this._onRefreshIcon(
        [...this.state.photos, ...assetsArr],
        noMore,
        false,
        data.page_info.end_cursor,
      )
    } 
    else {
      this.setState({
        loaded: false
      })
    }
  }
  // 刷新图片
  _onRefreshIcon=(data, hasMore, hasLoad, hasLastCursor)=>{
    let arr = [];
    let _hasMore = hasMore == null ? this.state.noMore : hasMore;
    let _hasLoad = hasLoad == null ? this.state.loaded : hasLoad;
    let _hasLastCursor = hasLastCursor == null ? this.state.hasLastCursor : hasLastCursor;
    for (let i=0; i<data.length; i++) {
      let asset = data[i];
      asset.key = i;
      asset.row = i;
      asset.isSelect = asset.isSelect == null ? false : asset.isSelect
      arr.push(asset);
    }
    this.setState({
      photos: arr,
      noMore: _hasMore,
      loaded: _hasLoad,
      lastCursor: _hasLastCursor
    })
  }

  //==================== 控件 ====================//
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
  table=()=>{
    return (
      <FlatList
        style={{flex: 1}}
        numColumns={3}
        data={[{photo: true, key: 0}, ...this.state.photos]}
        columnWrapperStyle={styles.row}
        renderItem={this._renderItem}
        onEndReached={this._onLoadMore}
      />
    )
  }
  toast=()=>{
    return (
      <Toast ref={"toast"} text={"抱歉哦, 最多9张图片啦"}/>
    )
  }
  renderLoadingView() {
    return (
      <View style={styles.load} >
        <Text>Loading image......</Text>
      </View>
    );
  }
  _renderItem=(item)=>{
    if (item.item.photo == true) {
      return (
        <CameraCell onPress={this._onCameraPress}/>
      )
    } else {
      return (
        <PhotoCell 
          item={item}
          onPress={this._onItemPress}
          selectCount={this.state.selectCount.length}
        />
      )
    }
  }
  render() { 
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.table()}
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
   }
});

// reducer
const mapStateToProps = state => ({
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
