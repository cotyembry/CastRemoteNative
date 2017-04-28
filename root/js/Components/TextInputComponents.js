          

import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


export default class TextInputComponents extends React.Component {
  render() {
    return(
      <View onLayout={(event) => this.props.registerLayout(event, 'textInput')} style={styles.root}>
          <TextInput
            keyboardType='numeric'
            style={styles.textInput1}
            placeholder={'Minutes'}
            value={this.props.minutes.toString()}
            onChangeText={this.props.minutesWasChanged}
            returnKeyType={'go'}
          ></TextInput>

          <View style={styles.colonParent}>
            <Text style={styles.colon}>:</Text>
          </View>

            {/*value={this.state.seconds*/}
          <TextInput
            keyboardType='numeric'
            style={styles.textInput2}
            placeholder={'Seconds'}
            value={this.props.seconds.toString()}
            onChangeText={this.props.secondsWasChanged}
            returnKeyType={'go'}
          ></TextInput>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  colonParent: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colon: {
    // flex: 1,
    // flexDirection: 'column',


  },
  root: {
    flex: 1,
    flexDirection: 'row',
        borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    margin: 7,
    // width: '98%',
    // height: 200
  },
  textInput1: {
    width: '50%',
    height: 100,
    textAlign: 'center'
  },
  textInput2: {
    width: '50%',
    height: 100,
    textAlign: 'center'
  }
})
