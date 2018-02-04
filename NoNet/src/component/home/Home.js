// Default
import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, InteractionManager } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD, HUD } from '../../common/index';
// 控件
import Top from './top/Top';
import Table from './table/Table';
import Bottom from './bottom/Bottom';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Home extends PureComponent {

  //==================== 系统 ====================//
  constructor(props) {
    super(props);
    this.state = {
      // 选择年份
      currentYear: DateManager.getYear(),
    }
  }

  //==================== 点击 ====================//
  // 设置
  _set=()=>{
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("Set");
    })
  }
  // 年份
  _onTopClick=()=>{
    this.refs.hud.show();
  }
  // 正面
  _onPositive=(i)=>{
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("List");
    })
  }
  // 反面
  _onOpposite=(day, month)=>{
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("Diary");
    })
  }
  // hud选择
  _onHudClick=(item)=>{
    this.setState({
      currentYear: item.year
    })
    if (item.year == DateManager.getYear()) {
      this.refs.table.scrollWithIndex(DateManager.getMonth() - 1)
    } else {
      this.refs.table.scrollWithIndex(0)
    }
  }
  // 当前月点击
  _onBottomCurrentClick=()=>{
    this.refs.table.scrollWithIndex(DateManager.getMonth()-1);
    setTimeout(() => {
      this.setState({
        currentYear: DateManager.getYear()
      })
    }, 1000);
  }
  // 编辑日记
  _onBottomEditClick=()=>{
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("Edit");
    })
  }
  // 切换卡片正反
  _onBottomChangClick=(isDetail)=>{
    this.refs.table.show(isDetail);
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        leftIcon={require('../../assets/images/icon_search.png')}
        rightClick={this._set}
        rightIcon={require('../../assets/images/icon_menu.png')}
      />
    )
  }
  top() {
    return (
      <Top onPress={this._onTopClick} name={this.state.currentYear}/>
    )
  }
  table() {
    return (
      <Table 
        ref={"table"}
        onPositive={this._onPositive}
        onOpposite={this._onOpposite}
        currentYear={this.state.currentYear}
      />
    )
  }
  bottom() {
    return (
      <Bottom 
        onChange={this._onBottomChangClick}
        onEdit={this._onBottomEditClick}
        onPress={this._onBottomCurrentClick}
      />
    )
  }
  hud() {
    return (
      <KKInputHUD 
        ref={"hud"} 
        type={HUD.DATE}
        onPress={this._onHudClick}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.top()}
        {this.table()}
        {this.bottom()}
        {this.hud()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
    justifyContent: 'space-between',
    paddingBottom: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);