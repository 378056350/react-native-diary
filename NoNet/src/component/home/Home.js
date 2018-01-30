// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD } from '../../common/index';
// 控件
import Top from './top/Top';
import Table from './table/Table';
import Bottom from './bottom/Bottom';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Home extends Component {

  _set=()=>{
    const { navigate } = this.props.navigation;
    navigate("Set");
  }
  _onTopClick=()=>{
    this.refs.hud.show();
  }
  _onBottomClick=(isDetail)=>{
    this.refs.table.show(isDetail);
  }

  nav() {
    return (
      <Navigation 
        leftText={'设置'}
        rightText={'asdasd'}
        leftClick={this._set}
      />
    )
  }
  top() {
    return (
      <Top onPress={this._onTopClick}/>
    )
  }
  table() {
    return (
      <Table ref={"table"}/>
    )
  }
  bottom() {
    return (
      <Bottom onPress={this._onBottomClick}/>
    )
  }
  hud() {
    return (
      <KKInputHUD ref={"hud"} text={"选择年份"}/>
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