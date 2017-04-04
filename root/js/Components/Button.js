

import React from 'react';

import {
	View,
	TouchableOpacity,
	Text,
  StyleSheet
} from 'react-native';

export default class Button extends React.Component {
  render() {
    var _styles = {}
    if(typeof this.props.style !== 'undefined') {
      _styles.root = StyleSheet.flatten([styles.root, this.props.style])
      // _styles.root = { ...styles.root }
    }
    else {
      // _styles.root = { ...styles.root }
      _styles.root = StyleSheet.flatten([styles.root])
    }
    return (
        <TouchableOpacity style={_styles.root} onPress={() => { this.props.onPress() }}>
          <View style={styles.componentParent}>
            { this.props.component }
            <Text style={styles.text}>{ typeof this.props.value !== 'undefined' ? this.props.value : 'Click Me'}</Text>
          </View>
        </TouchableOpacity>     
    )
  }
}

const styles = StyleSheet.create({
  componentParent: {
    alignItems: 'center',
    margin: 5
  },
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    
  }
})
