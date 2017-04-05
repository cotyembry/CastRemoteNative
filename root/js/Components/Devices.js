import React from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';


export default class Devices extends React.Component {
  constructor(props) {
    super(props);

    // this.registerChildWithParent = this.props.registerHelper; //registerHelper is a method that the parent exposes to accept a function that will be used to update this ChromecastDevicesModal's internal state

    this.state = {

    }
  }

  componentDidMount() {

  }
  render() {

    return (
      <View style={styles.root}>
        <Text>Devices.js</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row'
  }
})
