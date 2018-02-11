// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, Device, ThirdPicker, DateManager, Toast, Share } from '../../common/index';
// Utils
import ListFooter from './ListFooter';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor } from '../../utils/index';
import Line from '../../common/Line/Line';

class Set extends Component {

  //=================== 初始化 ===================//
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
      name: ["备份","感谢","反馈","系统","卡片日记"],
      detail: ["卡片日记将会与iCloud同步备份, 你可以再iPhone, iPad上同事使用, 及时重新安装也不必担心, 你的日记都在那里,. 魔法般的多设备同步于备份"],
      cell: [["iCloud自动备份","导入 / 导出"],["感谢饮料","分享给朋友","帮助我们翻译"],["应用内评论","去App Store评论","立即反馈"],["指纹锁","提醒","语言"],["关于","Open Source Libraries"]],
      needsComponent: false,
    }
  }
  componentDidMount() {
    this.setState({
      needsComponent: true,
    });
  }

  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onPress=(item)=>{
    console.log(item);
    if (item.section == 1 && item.row == 1) {
      this.refs.share.show()
    }
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        leftIcon={require('../../assets/images/icon_back_arrow.png')}
        leftClick={this._back}
      />
    )
  }
  data=()=>{
    let arr = [];
    for (var i=0; i<this.state.name.length; i++) {
      let data = [];
      for (var j=0; j<this.state.cell[i].length; j++) {
        data.push({
          key: j,
          section: i,
          row: j,
          name: this.state.cell[i][j]
        })
      }
      arr.push ({
        data: data, 
        title: this.state.name[i],
        detail: i < this.state.detail.length ? this.state.detail[i] : ""
      })
    }
    return arr;
  }
  list() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 1}}><Line color={LineColor}/></View>
        <SectionHeader name={this.state.name[0]} detail={this.state.detail[0]}/>
          <Cell item={{section: 0, row: 0, name: this.state.cell[0][0]}} detail={"这里还没做"}/>
          <Cell item={{section: 0, row: 1, name: this.state.cell[0][1]}} detail={"这里还没做"} next={true}/>
          <View style={{height: 20}}><Line color={LineColor}/></View>
        <SectionHeader name={this.state.name[1]} detail={this.state.detail[1]}/>
          <Cell item={{section: 1, row: 0, name: this.state.cell[1][0]}} detail={"这里还没做"} next={true}/>
          <Cell item={{section: 1, row: 1, name: this.state.cell[1][1]}} detail={"这里还没做"} next={true} onPress={this._onPress}/>
          <Cell item={{section: 1, row: 2, name: this.state.cell[1][2]}} detail={"这里还没做"} next={true}/>
          <View style={{height: 20}}><Line color={LineColor}/></View>
        <SectionHeader name={this.state.name[2]} detail={this.state.detail[2]}/>
          <Cell item={{section: 2, row: 0, name: this.state.cell[2][0]}} detail={"这里还没做"} next={true}/>
          <Cell item={{section: 2, row: 1, name: this.state.cell[2][1]}} detail={"这里还没做"} next={true}/>
          <Cell item={{section: 2, row: 2, name: this.state.cell[2][2]}} detail={"这里还没做"} next={true}/>
          <View style={{height: 20}}><Line color={LineColor}/></View>
        <SectionHeader name={this.state.name[3]} detail={this.state.detail[3]}/>
          <Cell item={{section: 3, row: 0, name: this.state.cell[3][0]}} detail={"这里还没做"} next={true} isSwitch={false}/>
          <Cell item={{section: 3, row: 1, name: this.state.cell[3][1]}} detail={"这里还没做"} next={true}/>
          <Cell item={{section: 3, row: 2, name: this.state.cell[3][2]}} detail={"这里还没做"} next={true}/>
          <View style={{height: 20}}><Line color={LineColor}/></View>
        <SectionHeader name={this.state.name[4]} detail={this.state.detail[4]}/>
          <Cell item={{section: 4, row: 0, name: this.state.cell[4][0]}} detail={"这里还没做"} next={true}/>
          <Cell item={{section: 4, row: 1, name: this.state.cell[4][1]}} detail={"这里还没做"} next={true}/>
          <View style={{height: 20}}><Line color={LineColor}/></View>
        <ListFooter/>
      </ScrollView>
    )
  }
  share=()=>{
    return (
      <Share ref={'share'}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.state.needsComponent ? this.list() : null}
        {this.share()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StreamColor,
    ...Device.ifDevice({
      paddingBottom: 20,
    },{
      paddingBottom: 0,
    },{
      paddingBottom: 0,
    }),
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

export default connect(mapStateToProps, mapDispatchToProps)(Set);