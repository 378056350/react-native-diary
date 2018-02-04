// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD } from '../../common/index';
import { NAVIGATION_HEIGHT } from '../tabbar/TabbarSetting';
// Utils
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';


class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}]
    }
  }

  //==================== 删除 ====================//
  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}
  deleteRow(rowMap, rowKey) {
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
      <Cell item={data.item}/>
    )
  }

  //==================== 控件 ====================//
  nav() {
    const { params } = this.props.navigation.state;
    return (
      <Navigation 
        leftIcon={require('../../assets/images/icon_back_arrow.png')}
        leftClick={this._back}
        // text={"JAUNARY/2018"}
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
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
              <Text style={styles.backTextWhite}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
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
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
