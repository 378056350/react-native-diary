// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
// Common
import { Navigation, ThirdPicker, DateManager, Toast, KKInputHUD } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, LineColor, TitleColor } from '../../utils/index';

class Cell extends Component {

  content() {
    if (false) {
      return (
        <Image style={styles.pic}/>
      )
    } else {
      return (
        <View style={styles.content}>
          <Image style={styles.contentT}/>
          <View style={styles.contentC}>
            <Text style={styles.contentText}>{this.props.item.key}</Text>
          </View>
          <Image style={styles.contentB}/>
        </View>
      )
    }
  }

  left() {
    return (
      <View style={styles.left}>
        <Text style={styles.name}>19</Text>
        <Text style={styles.detail}>FIR</Text>
        <Image style={styles.icon}/>
      </View>
    )
  }
  right() {
    return (
      <View style={styles.right}>
        {this.content()}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subview}>
          {this.left()}
          {this.right()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ScreenWidth / 5 * 3,
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: StreamColor,
  },
  subview: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: LineColor,
  },
  name: {
    fontSize: 36,
  },
  detail: {
    fontSize: 10,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: LineColor,
    marginTop: 5,
  },

  right: {
    flex: 2.5,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  contentT: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  contentC: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 12,
    fontWeight: '300',
    color: TitleColor,
  },
  contentB: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
  },
  pic: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default Cell;