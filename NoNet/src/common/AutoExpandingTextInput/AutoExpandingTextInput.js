import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
} from 'react-native';

class AutoExpandingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
      editable: true
    };
  }
  onContentSizeChange(event) {
    this.setState({
      text: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height,
    });
    this.props.onContentSizeChange();
  }
  getContent() {
    return this.state.text
  }

  // 是否在编辑
  isFocused() {
    return this.refs.content.isFocused()
  }

  // 禁用/启用编辑
  disableEdit() {
    this.setState({
      editable: false
    })
  }
  enableEdit() {
    this.setState({
      editable: true
    })
  }
  // 结束编辑
  endEditing() {
    this.refs.content.blur();
  }
  render() {
    const { style, textHeightMin, textHeightMax } = this.props;
    let textHeight = Math.max(textHeightMin, this.state.height);
    if (textHeight >= textHeightMax) {
      textHeight = textHeightMax;
    }
    return (
      <TextInput
        {...this.props}
        editable={this.state.editable}
        ref={"content"}
        multiline={true}
        onContentSizeChange={(event)=>this.onContentSizeChange(event)}
        underlineColorAndroid="transparent"
        style={[style, { height: textHeight }]}
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
      />
    );
  }
}

AutoExpandingTextInput.defaultProps = {
  textHeightMin: 150,
  textHeightMax: 100000,
}
AutoExpandingTextInput.propTypes = {
  textHeightMin: PropTypes.number.isRequired,
  textHeightMax: PropTypes.number.isRequired,
};

export default AutoExpandingTextInput;
