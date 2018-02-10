// Default
import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, InteractionManager } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { diaryAction } from '../../redux/action/index';
// Common
import { Navigation, ThirdPicker, DateManager, RealmManager, Toast, KKInputHUD, HUD } from '../../common/index';
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
      isDetail: false
    }
  }
  componentWillUpdate = (nextProps, nextState) => {
    let condition1 = nextState.isDetail != this.state.isDetail;
    if (condition1) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    const { DiaryAction } = this.props;
    // 初始化
    DiaryAction.initializationSaga();
    // 增
    // DiaryAction.saveDiarySaga({
    //   name: '123123123123123123', 
    //   content: '12312312321312321asdas', 
    //   weather: '3', 
    //   year: '2018',
    //   month: '2',
    //   day: '11', 
    //   photos: []
    // });
    // 查
    DiaryAction.loadDiarySaga();
    // 改
    RealmManager.replaceDiary(
      1, 
      '啊啊啊啊啊啊a', 
      '奥术大师大奥所多',
      '2018',
      '2',
      '10',
      '1',
      [],
    )
    // 删
    // DiaryAction.removeDiarySaga('id == 1')
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
      navigate("List", {
        name: DateManager.getMonthEnglish(i)+"/"+this.state.currentYear,
        year: this.state.currentYear,
        month: i+1,
        day: DateManager.getDay(),
      });
    })
  }
  // 反面
  _onOpposite=(day, month)=>{
    const { DiaryReducer } = this.props;
    let diarys = DiaryReducer.dateDiarys;
    let year = this.state.currentYear;
    if (diarys[year] != null && diarys[year][month] != null && diarys[year][month][day] != null) {
      this.pushDiary(year, month, day);
    } else {
      this.pushEdit(year, month, day);
    }
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
      this.refs.hud.setCurrentIndex(-1)
    }, 500);
  }
  // 编辑日记
  _onBottomEditClick=()=>{
    InteractionManager.runAfterInteractions(() => {
      let year = DateManager.getYear();
      let month = DateManager.getMonth();
      let day = DateManager.getDay();
      const { navigate } = this.props.navigation;
      navigate("Edit", {
        year: year,
        month: month,
        day: day,
        type: 0
      });
    })
  }
  // 切换卡片正反
  _onBottomChangClick=(isDetail)=>{
    if (this.refs.table.getAnimated() == false) {
      this.refs.table.show(isDetail);
      this.setState({
        isDetail: !this.state.isDetail
      })
    }
  }

  //==================== 操作 ====================//
  pushDiary(year, month, day) {
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("Diary", {
        year: year,
        month: month,
        day: day,
      });
    })
  }
  pushEdit(year, month, day) {
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      var that = this;
      navigate("Edit", {
        year: year,
        month: month,
        day: day,
        type: 0,
        callback: ()=>{
          console.log("回调了")
          setTimeout(() => {
            that.pushDiary(year, month, day);
          }, 1000);
        }
      });
    })
  }

  //==================== 控件 ====================//
  nav() {
    return (
      <Navigation 
        // leftIcon={require('../../assets/images/icon_search.png')}
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
    const { DiaryReducer } = this.props;
    return (
      <Table 
        ref={"table"}
        onPositive={this._onPositive}
        onOpposite={this._onOpposite}
        currentYear={this.state.currentYear}
        diarys={DiaryReducer.dateDiarys}
      />
    )
  }
  bottom() {
    const { DiaryReducer } = this.props;
    return (
      <Bottom 
        isDetail={this.state.isDetail}
        // 切换正反面
        onChange={this._onBottomChangClick}
        // 点击编辑
        onEdit={this._onBottomEditClick}
        // 点击今日
        onPress={this._onBottomCurrentClick}
        // 数据
        diarys={DiaryReducer.dateDiarys}
      />
    )
  }
  hud() {
    const { DiaryReducer } = this.props;
    return (
      <KKInputHUD 
        ref={"hud"} 
        type={HUD.DATE}
        onPress={this._onHudClick}
        diarys={DiaryReducer.dateDiarys}
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
  DiaryReducer: state.DiaryReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DiaryAction: bindActionCreators(diaryAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);