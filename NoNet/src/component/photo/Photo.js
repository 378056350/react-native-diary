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
  Switch,
} from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// 控件
import Cell from './Cell';
import { Navigation, ThirdPicker, KeyboardAccess, KKInputHUD, HUD, Swipe, Toast, AutoExpandingTextInput } from '../../common/index';
// action
import { dataAction } from '../../redux/action/index';
import { StreamColor } from '../../utils/index';
 
//网络图片地址
var imgURL = "http://www.hangge.com/blog/images/logo.png"
 
class Photo extends Component{

  //==================== 系统 ====================//
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      photos: [],
      noMore: true,
      lastCursor: null,
      selectCount: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    // 定义如何从cameraRoll中取数据
    var fetchParams = {
      first: 12, // 每次取六张
      groupTypes: 'All',
      assetType: 'Photos'
    }
    // 如果不是第一次取图片，则this.state.lastCursor不为空，下一次取图片时就从上次的结尾开始取
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }
    CameraRoll.getPhotos(fetchParams).then((data) => {
      this.setState({
        loaded: true,
      });
      this._appendAssets(data); // 取到图片数据后，交由appendAssets处理
    }).done();
  }
  _appendAssets=(data)=>{ 
    var assets = data.edges;
    var noMore = false;
    if (!data.page_info.has_next_page) { 
      noMore = true;
    }
    if (assets.length > 0) {
      let assetsArr = [];
      for (let i=0; i<assets.length; i++) {
        let asset = assets[i];
        asset.key = i + this.state.photos.length;
        asset.row = i + this.state.photos.length;
        asset.isSelect = 0;
        assetsArr.push(asset);
      }
      this.setState({
        photos: [...this.state.photos, ...assetsArr],
        noMore: noMore,
        lastCursor: data.page_info.end_cursor
      })
    }
  }
  _onLoadMore=()=>{
    if(!this.state.noMore) {
      this.fetchData();
    }
  }

  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _save=()=>{
    
  }
  _onItemPress=(item, isSelect)=>{
    if (isSelect == true) {
      this.state.selectCount.push(item.item.row);
      this.state.photos[item.item.row].isSelect = this.state.selectCount.length;
    } else {
      this.state.selectCount.pop();
      for (let i=0; i<this.state.photos.length; i++) {
        if (this.state.photos[i].isSelect > this.state.photos[item.item.row].isSelect) {
          this.state.photos[i].isSelect -= 1;
        }
      }
      this.state.photos[item.item.row].isSelect = 0;
      this.setState({
        photos: this.state.photos
      })
    }
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
        data={this.state.photos}
        columnWrapperStyle={styles.row}
        // data={[{key: 'a'}, {key: 'b'}, {key: '1'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}]}
        renderItem={this._renderItem}
        onEndReached={this._onLoadMore}
      />
    )
  }
  _renderItem=(item)=>{
    return (
      <Cell 
        item={item}
        onPress={this._onItemPress}
      />
    )
  }
  render() { 
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.table()}
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
    marginBottom: 10,
   },
   item: {

   },
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
