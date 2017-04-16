import React from 'react';
import { 
  Keyboard,
  NativeEventEmitter,
  NativeModules,
  StyleSheet, 
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

/*
  Next thing to do is to get the chromecast button to trigger the getDevices native method call
  so that the listener for it in the ChromecastDevicesModal Component

*/

//TODO: finish calling getMediaDuration from the NativeMethods 2 validate seek func
 


//Native Modules
var NativeMethods = NativeModules.NativeMethods;

import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

import Header from './js/Components/Header.js';
import HeaderText from './js/Components/HeaderText.js';

import Button from './js/Components/Button.js';
import Play from './js/Components/Play.js';
import Stop from './js/Components/Stop.js';
import Pause from './js/Components/Pause.js';
import FastForward from './js/Components/FastForward.js';
import Rewind from './js/Components/Rewind.js';

import DoneButtonToDismissKeyboard from './js/Components/DoneButtonToDismissKeyboard.js';
import Seek from './js/Components/Seek.js';

import SvgExample from './js/Components/Svg.js';

import ChromecastDevicesModal from './js/Components/ChromecastDevicesModal.js';

class MediaLength extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mediaDuration: ''
    }
  }
  render() {
    return (
      <View style={{width: '100%', alignItems: 'flex-end', paddingTop: 10, paddingRight: 10}}>
        <Text>{ this.props.mediaDuration }</Text>
      </View>
    )
  }
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.showModal = '';												//showModal will be assigned a function to be able to update a child component's internal state
    this.setStateOfDoneComponent = '';					//this will be used and set later to help the DoneButtonToDismissKeyboard.js Component manage it's state

    this.state = {
      availableDevices: [],											//updated by _updateDevices this will eventually hold an array of components to render to show the user which devices are available to tap on and connect to
      text: 'Skip to: <Enter Value Here>',      //text should be renamed and should be considered a number (in minutes) that will be used to skip/seek to
      play: true,                               //I keep this in sync with this.play that is below
    	focus: true,
      showModal: '',                            //this will be set, eventually, as a function that will be a callback to open up the ChromecastDevicesModal Component
      textInputValue: '',
      minutes: 'minutes',
      seconds: 'seconds',

      mediaDuration: ''                         //mediaDuration is used by MediaLength.js
    }
    this.play = true;

    this.clearIntervalIdForTimeComponent = '';

    this.deviceIsAvailableFlag = false;
  }
  componentDidMount() {
    this.eventEmitter = new NativeEventEmitter(NativeMethods);
    this.subscription1 = this.eventEmitter.addListener('mediaDuration', this.mediaDurationCallback.bind(this))
  }
  connect() {
    NativeMethods.connect();
  }
  disconnect() {
  	NativeMethods.disconnect();
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
  	//seek was pressed, so I will send the value that I have in the state to native ^_^

    //I am choosing to pass everything over to Swift as a string and from there, with the follwing Swift's methods: `Float(stringToConvert)`, `Double(stringToConvert`, `Int(stringToConvert`, etc..., I can handle all of that logic on the Native side
    // NativeMethods.seek(this.state.textInputValue.toString());  //if using just one text input, this works perfectly
    
    //here I will write some logic to use the minutes and second text boxes to send to the native method
    let secondsToSend = 0;
    let currentMinutes = parseFloat(this.state.minutes);
    let currentSeconds = parseFloat(this.state.seconds);

    if(typeof currentMinutes !== 'undefined' && isNaN(currentMinutes) === false) {
      //if minutes is defined
      secondsToSend = currentMinutes * 60;  //to convert from minutes to seconds
    }
    if(typeof currentSeconds !== 'undefined' && isNaN(currentSeconds) === false) {
      secondsToSend += currentSeconds;      //since secondsToSend will be set regardless of going through the above if section I can just add to secondsToSend
    }

    // console.log('secondsToSend = ' + secondsToSend)

    this.secondsToSend = secondsToSend; //expose this here to use in the `this.mediaDurationCallback` method as a synthetic paramter
    //I will add one last check to make sure this is a valid time/valid input to switch/seek to
    NativeMethods.getMediaDuration();
    //this will have the value returned asyncronously by calling `this.mediaDurationCallback`
    //so head over there to finish this logic up
  }    
  stop() {
    NativeMethods.stop();
  }

  textInputValueChanged(e) {
    this.setState({
      textInputValue: parseFloat(e)
    })
  }
  secondsWasChanged(e) {
    this.setState({
      seconds: parseFloat(e)
    })
  }
  mediaDurationCallback(mediaDuration) {
    if(this.secondsToSend <= mediaDuration) {
      if(this.secondsToSend >= 0) {
        //if here then they entered in a valid value to seek to within the current media that is playing
        NativeMethods.seek(secondsToSend.toString());
      }
      else {
        //TODO: set text of Header.js to say briefly the value given must be positive
      }
    }
    else {
      //if here then the value entered was too large and exceeds the current media length
      //TODO: update Header.js with this info for the user
    }

    console.log('remember to uncommented in App.js from this.mediaDurationCallback(...)')
  }
  minutesWasChanged(e) {
    this.setState({
      minutes: parseFloat(e)
    })
  }
  registerChildInParentHelper(_setStateOfDoneComponent) { //_setStateOfDoneComponent is of type function
    //this will take in a fuction that has the ability to set the state of the child `Done` Component
    this.setStateOfDoneComponent = _setStateOfDoneComponent;
  }
  test() {
    NativeMethods._getDevices((error, data) => {
      if(error) {
        console.log('error', error)
      }
      else {
        console.log('it worked: ', data)
      }
    });
    // NativeMethods.test();
    // NativeMethods.test('test', 'bodyStringFromJS');
  }
  _registerHelper(functionToUpdateChild) {

    //registerHelper is used by the ChromecastDevicesModal Component to expose its state to this App parent component
    //this will be called once the ChromecastDevicesModal Component mounts and will accept the function that is capable of setting the childs internal state
    this.setState({
      showModal: functionToUpdateChild
    })
  }
  _startAnimation() {
    // this was moved over into logic that uses the ../store.js file to expose their callbacks that can set their internal state
    // //_startAnimation is passed in as a prop to ChromecastDevicesModal.js to be used to help propagate up the event from when the user taps on a device to start connecting to
    // //this allows me to start animating through the different chromecast icons while connecting to the device asyncronously

    // //...: finish animating through the different chromecast states
    // // alert('in _startAnimation in App.js')

  }
  _updateDeviceList(AvailableDevices) {
  	console.log('in _updateDeviceList in App.js', AvailableDevices)
    this.setState({
      availableDevices: AvailableDevices
    })
  }
  render() {
    //'Seek to: <Enter number here>'
    //<View style={styles.columnHelper}></View>
    return (
    	<KeyboardAwareView>
	      <View style={styles.container}>
	        
	        <Header updateDeviceList={this._updateDeviceList.bind(this)} showModal={this.state.showModal} />

	        <HeaderText />


          {/* TODO: get MediaLength where the mediaDuration value gets updated as the media changes while connected to the chromecast device */}
          <MediaLength mediaDuration={this.state.mediaDuration} />
	       

	   				{/*
	   				<Button value='Scan' onPress={this.scan.bind(this)} />
						<Button value='Connect' onPress={this.connect.bind(this)} />
						*/}     
						<Button value='Disconnect' setStyle={true} onPress={this.disconnect.bind(this)} />
	        

          {/* this snippet of code can be used as a single keyboard input
            <TextInput
              keyboardType='numeric'
              style={styles.textInput}
              placeholder={'Minutes'}
              value={this.textInputValue}
              onChangeText={this.textInputValueChanged.bind(this)}
              onPress={this.seekToPressed.bind(this)}
            ></TextInput>
          */}
                {/*value={this.state.minutes*/}
          <View style={styles.textInputs}>
              <TextInput
                keyboardType='numeric'
                style={styles.textInput1}
                placeholder={'Minutes'}
                onChangeText={this.minutesWasChanged.bind(this)}
              ></TextInput>

              <Text style={styles.colon}>:</Text>

                {/*value={this.state.seconds*/}
              <TextInput
                keyboardType='numeric'
                style={styles.textInput2}
                placeholder={'Seconds'}
  	            onChangeText={this.secondsWasChanged.bind(this)}
  	          ></TextInput>
          </View>

						<Button value='Seek' setStyle={true} style={styles.seekButton} onPress={this.seek.bind(this)} />
						
            <Button value='Test' style={styles.seekButton} setStyle={true} onPress={this.test.bind(this)} />

						<View style={styles.buttons}>

              <Button style={styles.columnButton}  value='Pause' component={<Pause />} onPress={this.pause.bind(this)} />
              <Button value='Rewind' component={<Rewind />} onPress={this.stop.bind(this)} />
              <Button style={styles.columnButton} value='Play' component={<Play />} onPress={this.playMedia.bind(this)} />
              <Button value='FastForward' component={<FastForward />} onPress={this.stop.bind(this)} />
              <Button style={styles.columnButton}  value='Stop' component={<Stop />} onPress={this.stop.bind(this)} />
							

              
              
						</View>


						<ChromecastDevicesModal startAnimation={this._startAnimation.bind(this)} devices={this.state.availableDevices} registerHelper={this._registerHelper.bind(this)} />

	      </View>

	    	{/* placing DoneButtonToDismissKeyboard here, I get the positioning of the done button being right above the keyboard for free because of this awesome KeyboardAwareView Component */}

        <View style={styles.keyboardButtons}>        
          <DoneButtonToDismissKeyboard registerInParent={this.registerChildInParentHelper.bind(this)} />
          {/*
              TODO: get this Seek keyboard button to work
    
            <Seek registerInParent={this.registerChildInParentHelper.bind(this)} />*/}
        </View>
	    </KeyboardAwareView>
    )
	}
}

const styles = StyleSheet.create({
	buttons: {
		flex: 1,
		flexDirection: 'row',
    // width: '100%',
		marginBottom: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 2.5,
    paddingLeft: 2.5
	},
  columnButton: {
    // height: '100%',
    // width: '100%'
  },
  colon: {
    flexDirection: 'column',
    fontSize: 28,
    lineHeight: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyboardButtons: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  seekButton: {
    flexDirection: 'column',
    alignItems: 'center', 
    width: '100%'
  },
  columnHelper: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput1: {
    width: '50%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'flex-start'
  },
  textInput2: {
    width: '50%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'flex-end'
  },
  textInput: {
    height: 40,
    textAlign: 'center'
  },
  textInputs: {
    flexDirection: 'row',
    height: 40,
    width: '98%',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
