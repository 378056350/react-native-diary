// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// 控件
import Top from './Top';
import Table from './Table';
import Bottom from './Bottom';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Home extends Component {


  _set=()=>{
    const { navigate } = this.props.navigation;
    navigate("Set");
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
      <Top/>
    )
  }
  table() {
    return (
      <Table/>
    )
  }
  bottom() {
    return (
      <Bottom/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.top()}
        {this.table()}
        {this.bottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
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