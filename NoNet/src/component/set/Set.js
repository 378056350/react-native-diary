// Default
import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, SectionList, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, Toast } from '../../common/index';
// Utils
import ListFooter from './ListFooter';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor, LineColor } from '../../utils/index';
import Line from '../../common/Line/Line';

class Set extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
      name: ["备份","感谢","反馈","系统","卡片日记"],
      detail: ["卡片日记将会与iCloud同步备份, 你可以再iPhone, iPad上同事使用, 及时重新安装也不必担心, 你的日记都在那里,. 魔法般的多设备同步于备份"],
      cell: [["iCloud自动备份","导入 / 导出"],["感谢饮料","分享给朋友","帮助我们朋友"],["应用内评论","去App Store评论","立即反馈"],["指纹锁","提醒","语言"],["关于","Open Source Libraries"]]
    }
  }

  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  nav() {
    return (
      <Navigation 
        leftText={'返回'}
        leftClick={this._back}
      />
    )
  }
  _renderItem=(item)=>{
    return (
      <Cell item={item}/>
    )
  }
  _renderSectionHeader=(section)=>{
    return (
      <SectionHeader name={section.title} detail={section.detail}/>
    )
  }
  _ListFooterComponent=()=>{
    return (
      <ListFooter/>
    )
  }
  _ListHeaderComponent=()=>{
    return (
      <View style={{height: 1}}>
        <Line color={LineColor}/>
      </View>
    )
  }
  // _SectionSeparatorComponent=()=>{
  //   return (
  //     <Text>section</Text>
  //   )
  // }
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
      <SectionList
        style={{flex: 1}}
        renderItem={({item}) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
        renderSectionFooter={({section})=><SectionFooter/>}
        sections={this.data()}
        ListFooterComponent={this._ListFooterComponent}
        ListHeaderComponent={this._ListHeaderComponent}
        stickySectionHeadersEnabled={false}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.list()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StreamColor,
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

export default connect(mapStateToProps, mapDispatchToProps)(Set);