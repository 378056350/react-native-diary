// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Alert, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, Device, RealmManager, DateManager, Toast, KKInputHUD } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';


class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }
  componentDidMount() {
    this.data();
  }

  //==================== 删除 ====================//
  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}
  removeRow(rowMap, rowKey) {
    this.removeDiary(rowMap, rowKey, ()=>{
      this.removeCell(rowMap, rowKey)
    })
    
  }
  removeDiary(rowMap, rowKey, callback) {
    const { DiaryAction } = this.props;
    let diary = this.state.dataSource[rowKey];
    let filtered = "year == '" + diary.year + "' && month == '" + diary.month + "' && day == '" + diary.day + "'";
    RealmManager.removeDiary(filtered, ()=>{
      DiaryAction.loadDiarySaga();
      callback();
    }) 
    // DiaryAction.removeDiarySaga(filtered);
  }
  removeCell(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.dataSource];
		const prevIndex = this.state.dataSource.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({dataSource: newData});
  }

  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _ListEmptyComponent=()=>{
    return (
      <View style={styles.empty}>
        <Text style={styles.diary}>没有日记</Text>
      </View>
    )
  }
  _renderItem=(data, rowMap)=>{
    return (
      <Cell item={data.item} onPress={()=>this._onPress(data.item)}/>
    )
  }
  _onPress=(item)=>{
    const { navigate } = this.props.navigation;
    navigate("Diary", {
      year: item.year,
      month: item.month,
      day: item.day,
      weather: item.weather,
      name: item.name,
      content: item.content,
      photos: item.photos
    });
  }
  _removeDiary(rowMap, rowKey) {
    Alert.alert(
      '你确定要删除这篇日记吗?',
      '你不能撤销这个操作',
      [
        {text: '删除', onPress: ()=>this.removeRow(rowMap, rowKey), style: 'cancel'},
        {text: '取消', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }

  //==================== 控件 ====================//
  data() {
    const { params } = this.props.navigation.state;
    const { DiaryReducer } = this.props;
    let arr = [];
    let count = 0;
    let year  = params.year;
    let month = params.month;
    if (DiaryReducer.dateDiarys[year] != null) {
      if (DiaryReducer.dateDiarys[year][month] != null) {
        count = DiaryReducer.dateDiarys[year][month]["array"].length;
      }
    }
    for (let i=0; i<count; i++) {
      let diary = DiaryReducer.dateDiarys[year][month]["array"][i];
      diary.key = i;
      arr.push(diary);
    }
    this.setState({
      dataSource: arr
    })
  }
  nav() {
    const { params } = this.props.navigation.state;
    return (
      <Navigation 
        leftIcon={require('../../assets/images/icon_back_arrow.png')}
        leftClick={this._back}
        text={params.name}
      />
    )
  }
  table() {
    return (
      <SwipeListView
        useFlatList
        data={this.state.dataSource}
        ListEmptyComponent={this._ListEmptyComponent}
        renderItem={(data, rowMap) => this._renderItem(data)}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this._removeDiary(rowMap, data.item.key) }>
              <Text style={styles.backTextWhite}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={<View style={{height: 20}}/>}
        disableRightSwipe={true}
        rightOpenValue={-75}
        onRowDidOpen={this.onRowDidOpen}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StreamColor,
    justifyContent: 'space-between',
  },
  diary: {
    fontSize: 14,
    color: TitleColor
  },
  empty: {
    flex: 1, 
    height: ScreenHeight - NAVIGATION_HEIGHT, 
    justifyContent: 'center',
    alignItems: 'center',
  },


	
	backTextWhite: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
    alignItems: 'flex-end',
    paddingRight: 20,
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: ScreenWidth
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});

// reducer
const mapStateToProps = state => ({
  DiaryReducer: state.DiaryReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DiaryAction: bindActionCreators(diaryAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
