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
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';
import Cell from './Cell';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Set extends Component {

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
      <Cell/>
    )
  }
  _renderSectionHeader=(section)=>{
    return (
      <SectionHeader/>
    )
  }
  // _SectionSeparatorComponent=()=>{
  //   return (
  //     <Text>section</Text>
  //   )
  // }
  list() {
    return (
      <SectionList
        style={{flex: 1}}
        renderItem={({item}) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
        renderSectionFooter={()=><SectionFooter/>}
        sections={[ 
          {data: [{key: 0},{key: 1},{key: 2}], title: '123'},
          {data: [{key: 0}], title: '123'},
          {data: [{key: 0}], title: '123'},
          {data: [{key: 0}], title: '123'}
        ]}
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

export default connect(mapStateToProps, mapDispatchToProps)(Set);