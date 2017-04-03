

import React from 'react';

import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';

export default class Button extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={() => { this.props.onPress() }}>
          <View>
            <Text>{ typeof this.props.value !== 'undefined' ? this.props.value : 'Click Me'}</Text>
          </View>
        </TouchableOpacity>     
    )
  }
}
