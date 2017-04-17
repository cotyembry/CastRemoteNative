import React from 'react';
import { 
  Keyboard,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet, 
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

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
import MediaLength from './js/Components/MediaLength.js';
import Seek from './js/Components/Seek.js';
import SvgExample from './js/Components/Svg.js';
import TextInputComponents from './js/Components/TextInputComponents.js';
import ChromecastDevicesModal from './js/Components/ChromecastDevicesModal.js';
import store from './js/store.js';

//Native Modules
var NativeMethods = NativeModules.NativeMethods;


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.showModal = '';												//showModal will be assigned a function to be able to update a child component's internal state
    this.setStateOfDoneComponent = '';					//this will be used and set later to help the DoneButtonToDismissKeyboard.js Component manage it's state
    this.componentKeys = [];                    //componentKeys will be used to store the component's layout data to be used to size components correctly so that when the keyboard comes up the height of the input elements doesn't get smaller and smush the text inside the input components

    this.state = {
      availableDevices: [],											//updated by _updateDevices this will eventually hold an array of components to render to show the user which devices are available to tap on and connect to
      text: 'Skip to: <Enter Value Here>',      //text should be renamed and should be considered a number (in minutes) that will be used to skip/seek to
      play: true,                               //I keep this in sync with this.play that is below
    	focus: true,
      showModal: '',                            //this will be set, eventually, as a function that will be a callback to open up the ChromecastDevicesModal Component
      textInputValue: '',
      minutes: '',
      seconds: '',
      mediaDuration: '',                        //mediaDuration is used by MediaLength.js
      headerText: '',
      _styles: {
        textInputs: {}
      }
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
  mediaDurationCallback(mediaDuration) {
    //mediaDurationCallback is called from Native code which passes the mediaDuration here
    if(this.secondsToSend <= mediaDuration) {
      //if here then they entered in a valid value to seek to within the current media that is playing
      NativeMethods.seek(secondsToSend.toString());
    }
    else {
      //if here then the value entered was too large and exceeds the current media length
      //TODO: update Header.js with this info for the user
      this.updateHeader("Can't skip that far", true, true)
    }
  }
  fastForward() {
    NativeMethods.fastForward();
  }
  minutesWasChanged(e) {
    this.setState({
      minutes: e === '' ? '' : parseFloat(e)
    })
  }
  playMedia() {
    NativeMethods.play();
  }
  pause() {
    NativeMethods.pause();
  }
  registerLayout(event, componentKey) {
    console.log('in registerLayout')
    //registerLayout will be used to generically register they layouts as the callback functions get invoked
    // this.componentKeys[componentKey] = event.nativeEvent;
    //access width, height, x, and y by accessing:
    //  this.componentKeys['textInput'].layout.width, etc....

    //now set the style
    //here I will only set the height if the prior height was smaller (render gets called a few times with different height values at first)
    if(typeof this.state._styles.textInputs.height === 'undefined' || this.state._styles.textInputs.height < event.nativeEvent.layout.height) {
      //i.e. if the height is not defined in `this.state._styles...`
      //or there is a larger height than already in the state _styles
      //-if the two above lives are correct, run the follwing code:
      let textInputs = {
        height: event.nativeEvent.layout.height
      }

      this.setState({
        _styles: {
          textInputs: textInputs
        }
      })
      console.log('in override: ', textInputs)
    }
  }
  rewind() {
    alert('rewind')
    NativeMethods.rewind();
  }
  registerChildInParentHelper(_setStateOfDoneComponent) { //_setStateOfDoneComponent is of type function
    //this will take in a fuction that has the ability to set the state of the child `Done` Component
    this.setStateOfDoneComponent = _setStateOfDoneComponent;
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
    if(store.data['isConnectedToDevice'] === true) {
      if(secondsToSend < 0) {
        this.updateHeader('Value must be positive...', true, true)
      }
      else if(secondsToSend !== '-') {
        NativeMethods.getMediaDuration();
        //this will have the value returned asyncronously by calling `this.mediaDurationCallback`
        //so head over there to finish this logic up
      }
    }
    else {
      this.updateHeader('Connect To Device 1st', true, true)
    }
  }    
  stop() {
    NativeMethods.stop();
  }
  secondsWasChanged(e) {
    let seconds = e;
    if(e === '') {
      seconds = '';
    }
    else if(e === '-') {
      seconds = '-';
    }
    else {
      seconds = parseFloat(e)
    }
    this.setState({
      seconds: seconds
    })
  }
  textInputValueChanged(e) {
    this.setState({
      textInputValue: parseFloat(e)
    })
  }
  updateHeader(textToSetThenRemove, eraseAfterTimeFlag, setTextInputsToNullFlag) {
    this.setState({
      headerText: textToSetThenRemove
    })
    if(setTextInputsToNullFlag === true) {
      this.setState({
        minutes: '',  //this will reset both of the text inputs, respectively, so the user doesnt have to erase it themselves
        seconds: ''
      })
    }
    if(eraseAfterTimeFlag === true) {
      var callback = function() {
        this.setState({
          headerText: ''
        })
      }
      callback = callback.bind(this);
      setTimeout(callback, 5000)
    }
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
    let _styles = {};
    _styles.textInputs = StyleSheet.flatten([styles.textInputs, this.state._styles.textInputs])
    let tempStyle = {
      height: _styles.textInputs.height
    };
    _styles.textInputComponents = StyleSheet.flatten([styles.textInput1, tempStyle])

    return (
      <View style={{flex: 1}}>
      	<KeyboardAwareView animated={true}>
  	      <Header updateDeviceList={this._updateDeviceList.bind(this)} showModal={this.state.showModal} />
          <ScrollView style={styles.container}>
  	        <HeaderText text={this.state.headerText} />
            {/* TODO: get MediaLength where the mediaDuration value gets updated as the media changes while connected to the chromecast device */}
            <MediaLength mediaDuration={this.state.mediaDuration} />
  					<Button value='Disconnect' setStyle={true} onPress={this.disconnect.bind(this)} />
            <TextInputComponents registerLayout={this.registerLayout.bind(this)} minutes={this.state.minutes} seconds={this.state.seconds} minutesWasChanged={this.minutesWasChanged.bind(this)} secondsWasChanged={this.secondsWasChanged.bind(this)} />
  					<Button value='Seek' setStyle={true} style={styles.seekButton} onPress={this.seek.bind(this)} />
            <View style={styles.buttons}>
              <Button style={styles.columnButton}  value='Pause' component={<Pause />} onPress={this.pause.bind(this)} />
              <Button value='Rewind' component={<Rewind />} onPress={this.rewind.bind(this)} />
              <Button style={styles.columnButton} value='Play' component={<Play />} onPress={this.playMedia.bind(this)} />
              <Button value='FastForward' component={<FastForward />} onPress={this.fastForward.bind(this)} />
              <Button style={styles.columnButton}  value='Stop' component={<Stop />} onPress={this.stop.bind(this)} />
  					</View>
  						<ChromecastDevicesModal startAnimation={this._startAnimation.bind(this)} devices={this.state.availableDevices} registerHelper={this._registerHelper.bind(this)} />
  	      </ScrollView>
  	    	{/* placing DoneButtonToDismissKeyboard here, I get the positioning of the done button being right above the keyboard for free because of this awesome KeyboardAwareView Component */}
          <View style={styles.keyboardButtons}>        
            <DoneButtonToDismissKeyboard registerInParent={this.registerChildInParentHelper.bind(this)} />
            {/*
                TODO: get this Seek keyboard button to work
              <Seek registerInParent={this.registerChildInParentHelper.bind(this)} />*/}
          </View>
  	    </KeyboardAwareView>
      </View>
    )
	}
}

const styles = StyleSheet.create({
	buttons: {
    height: 42,
		flex: 1,
		flexDirection: 'row',
    // width: '100%',
    marginTop: 14,
		marginBottom: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 2.5,
    paddingLeft: 2.5
	},
  columnButton: {
    // height: '100%',
    // width: '100%'
    height: 42
  },
  colon: {
    flexDirection: 'column',
    fontSize: 28,
    lineHeight: 21,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    // height: '100%'
    flex: 1,
    // width: '100%',
    // height: 700,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  keyboardButtons: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  seekButton: {
    // paddingTop: 50,
    // flexDirection: 'column',
    // alignItems: 'center', 
    // width: '100%',
    flex: 1
  },
  columnHelper: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputAndButtonsContainer: {

  },
  root: {
    width: '100%',
    height: '100%'
  },
  scrollView: {
    flex: 1
  },
  textInput1: {
    width: '50%',
    height: 100,
    // flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-start'
  },
  textInput2: {
    width: '50%',
    height: 100,
    // flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-end'
  },
  textInput: {
    height: 40,
    textAlign: 'center'
  },
  textInputs: {
    flexDirection: 'row',
    height: 100,
    width: '98%',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
