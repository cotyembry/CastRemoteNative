import React from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeModules,
  DeviceEventEmitter,
  Keyboard
} from 'react-native';


//Native Modules
var NativeMethods = NativeModules.NativeMethods;

import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

import HeaderText from './js/Components/HeaderText.js';

import Button from './js/Components/Button.js';
import Play from './js/Components/Play.js';
import Stop from './js/Components/Stop.js';
import Pause from './js/Components/Pause.js';
import FastForward from './js/Components/FastForward.js';
import Rewind from './js/Components/Rewind.js';

import DoneButtonToDismissKeyboard from './js/Components/DoneButtonToDismissKeyboard.js';

import SvgExample from './js/Components/Svg.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.setStateOfDoneComponent = '';					//this will be used and set later to help the DoneButtonToDismissKeyboard.js Component manage it's state

    this.state = {
      children: [],
      text: 'Skip to: <Enter Value Here>',      //text should be renamed and should be considered a number (in minutes) that will be used to skip/seek to
      play: true,                                //I keep this in sync with this.play that is below
    	focus: true
    }
    this.play = true;

    this.clearIntervalIdForTimeComponent = '';

    this.deviceIsAvailableFlag = false;
  }
  connect() {
    NativeMethods.connect();
  }
  playMedia() {
    NativeMethods.play();
  }
  pause() {
    NativeMethods.pause();
  }
  scan() {
    NativeMethods.scan();
  }
  seek() {
    NativeMethods.seek();
  }    
  stop() {
    NativeMethods.stop();
  }


  render() {

    return (
    	<KeyboardAwareView>
	      <View style={styles.container}>
	        
	        <HeaderText />


	       

	   				<Button value='Scan' onPress={this.scan.bind(this)} />
						<Button value='Connect' onPress={this.connect.bind(this)} />     
	        
	   

	          <TextInput
	          	keyboardType='numeric'
	            style={styles.textInput}
	            placeholder={'Seek to: <Enter number here>'}
	            onChangeText={(text) => { this.setState({ text: text })}}
	          	onPress={this.seekToPressed.bind(this)}
	          ></TextInput>

						<Button value='Seek' style={styles.columnHelper} onPress={this.seek.bind(this)} />
						
						<View style={styles.buttons}>





							<Button value='Rewind' component={<Rewind />} onPress={this.stop.bind(this)} />
							
							<View style={styles.columnHelper}>
								<Button value='Play' component={<Play />} onPress={this.playMedia.bind(this)} />
								<Button value='Pause' component={<Pause />} onPress={this.pause.bind(this)} />
								<Button value='Stop' component={<Stop />} onPress={this.stop.bind(this)} />
							</View>

							<Button value='FastForward' component={<FastForward />} onPress={this.stop.bind(this)} />
						
						</View>


	      </View>

	    	{/* placing DoneButtonToDismissKeyboard here, I get the positioning of the done button being right above the keyboard for free */}
	   		<DoneButtonToDismissKeyboard registerInParent={this.registerChildInParentHelper.bind(this)} />
	    </KeyboardAwareView>
    )
	}
  registerChildInParentHelper(_setStateOfDoneComponent) {	//_setStateOfDoneComponent is of type function
  	//this will take in a fuction that has the ability to set the state of the child `Done` Component
  	this.setStateOfDoneComponent = _setStateOfDoneComponent;
  }
  seekToPressed() {
  	//when this is tapped I need to change the value of the done button's internal focus state of the Done button Component that can dismiss the keyboard
  	// this.setStateOfDoneComponent();
  	alert('hi')
  }
}

const styles = StyleSheet.create({
	buttons: {
		flex: 1, 
		flexDirection: 'row',
		marginBottom: 100
	},
	columnHelper: {
		flexDirection: 'column',
		alignItems: 'center'
	},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
  	height: 40,
  	textAlign: 'center'
  }
});
