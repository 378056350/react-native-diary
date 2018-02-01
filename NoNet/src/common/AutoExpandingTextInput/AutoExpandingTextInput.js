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
    };
  }

  onContentSizeChange(event) {
    this.setState({
      text: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height,
    });
    this.props.onContentSizeChange();
  }

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
        ref={"content"}
        multiline={true}
        onContentSizeChange={(event)=>this.onContentSizeChange(event)}
        underlineColorAndroid="transparent"
        style={[style, { height: textHeight }]}
        value={this.state.text}
      />
    );
  }
}

AutoExpandingTextInput.defaultProps = {
  textHeightMin: 0,
  textHeightMax: 100000,
}
AutoExpandingTextInput.propTypes = {
  textHeightMin: PropTypes.number.isRequired,
  textHeightMax: PropTypes.number.isRequired,
};

export default AutoExpandingTextInput;
