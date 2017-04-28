import React from 'react';
import {
  Modal,
  NativeEventEmitter,
  // NativeAppEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Device from './Device.js';

import store from '../store.js';

var NativeMethods = NativeModules.NativeMethods;

export default class ChromecastDevicesModal extends React.Component {
  constructor(props) {
    super(props);

    //create the instance of the event emitter so I can listen to the native events that get sent to the js side
    this.eventEmitter = new NativeEventEmitter(NativeMethods);
    // this.subscription = this.eventEmitter.addListener('deviceList', this.deviceListCallback.bind(this));
    this.subscription1 = this.eventEmitter.addListener('test', (body) => { console.log('in test event listener callback', body)});


    // this.subscription2 = this.eventEmitter.addListener('deviceDidGoOnline', (body) => { this.deviceDidGoOnline.bind(this) });
    this.subscription2 = this.eventEmitter.addListener('deviceDidGoOnline', (body) => { this.deviceDidGoOnline.apply(this, [body]) });
    this.subscription3 = this.eventEmitter.addListener('deviceDidGoOffline', (body) => { this.deviceDidGoOffline.apply(this, [body]) });

  

    this.deviceKeys = [];


    this.state = {
    	deviceKeys: [],
    	deviceChildren: [],
      modalVisible: false
    }
  }
  componentWillUnmount() {
    // Don't forget to unsubscribe to the native events when the component is not mounted
    this.subscription1.remove();
    this.subscription2.remove();
    this.subscription3.remove();
  }
  componentDidMount() {
    //now that the component has mounted, I will register the method for this Component to allow the parent component to update its internal state
    this.props.registerHelper(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope
    // this.registerChildWithParent(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope

    store.register('dismissModal', this.dismissModal.bind(this))

  }
  deviceDidGoOffline(deviceObjectArray) {

  	let deviceId = deviceObjectArray[0],
  			deviceFriendlyName = deviceObjectArray[1],
  			deviceChildren = [];
  	
  	delete this.deviceKeys[deviceId];								//remove this particular key for this object

  	this.setState({
  		deviceKeys: this.deviceKeys
  	})

  }
  deviceDidGoOnline(deviceObjectArray) {
  	let deviceId = deviceObjectArray[0],
  			deviceFriendlyName = deviceObjectArray[1];
  	this.deviceKeys[deviceId] = deviceFriendlyName;

  	this.setState({
  		deviceKeys: this.deviceKeys
  	})
  }
  dismissModal() {
    this.setState({
      modalVisible: false
    })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _setStateHelper(newStateToSet) {
    //_setStateHelper will be called in the parent component, but will be executed in this current scope (I think that is so awesome, but it can definitely be confusing when you dont understand it...let me tell you)
    if(typeof newStateToSet !== 'undefined') {
      this.setState(newStateToSet);
    }
    else {
      console.warn('Warning: in ChromecastDevicesModal.js _setStateHelper is trying to set null state');
    }
  }
  _startAnimation() {
    //_startAnimation should propagate the event upwards to the parent
    //it is passed in as a prop with the `this` value bound to the current scope
    //so when this is actually executed, this means that the device to connect to was pressed

    //this still needs to propagate up to the parent component that is the same level as the cast icon
    
    //1st dismiss the modal since the user selected the device that they wanted to connect to
    this.setState({modalVisible: false});
    this.props.startAnimation();
    

  }
  render() {
    //create the device components that will be rendered soon
  	let deviceChildren = Object.keys(this.state.deviceKeys).map((deviceKey, key) =>
  		<Device startAnimation={this._startAnimation.bind(this)} key={key} _key={key} deviceKey={deviceKey} friendlyName={this.state.deviceKeys[deviceKey]} />
  	)

    return (
      <View style={styles.root}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {/*alert("Modal has been closed.")*/}}
        >
          <ScrollView style={styles.root}>
              <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                <Text style={{ fontSize: 28, textAlign: 'center' }}>Done</Text>
              </TouchableHighlight>

              {deviceChildren.length > 0 &&
                <Text style={{textAlign: 'center'}}>Select the device you want to connect to below:</Text>
              }

              {
                deviceChildren.map((OnlineDevice) => OnlineDevice)
              }
          </ScrollView>
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    marginTop: 22,
    flex: 1,
    flexDirection: 'column'
  },
  hideButton: {
    fontSize: 28,
    textAlign: 'center'
    // alignContent: 'center',
    // flex: 1,
    // justifyContent: 'center'
  }
})
