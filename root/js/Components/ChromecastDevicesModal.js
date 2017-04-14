import React from 'react';
import {
  NativeEventEmitter,
  // NativeAppEventEmitter,
  NativeModules,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';

import Device from './Device.js';

var NativeMethods = NativeModules.NativeMethods;

export default class ChromecastDevicesModal extends React.Component {
  constructor(props) {
    super(props);

    //create the instance of the event emitter so I can listen to the native events that get sent to the js side
    this.eventEmitter = new NativeEventEmitter(NativeMethods);
    this.subscription = this.eventEmitter.addListener('deviceList', this.deviceListCallback.bind(this));
    this.subscription = this.eventEmitter.addListener('test', (body) => { console.log('in test event listener callback', body)});

  

    this.state = {
    	deviceChildren: [],
      modalVisible: false
    }
  }
  componentWillUnmount() {
    // Don't forget to unsubscribe to the native events when the component is not mounted
    this.subscription.remove();
  }
  componentDidMount() {
    //now that the component has mounted, I will register the method for this Component to allow the parent component to update its internal state
    this.props.registerHelper(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope
    // this.registerChildWithParent(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope


  }
  deviceListCallback(deviceString) {
    console.log(deviceString)
    let devices = [];
    if(typeof deviceString !== 'undefined') {
			// devices = deviceString.toString().split('|').map((deviceFriendlyName, _key) =>
			// 	<View style={styles.deviceNameStyle}>
			// 		<Text style={styles.deviceNameText}>{deviceFriendlyName}</Text>
			// 	</View>
			// )

			let fnames_deviceids = deviceString.split('_?splitOnThis?_');

			let deviceFriendlyName = fnames_deviceids[0];
			let deviceIds = fnames_deviceids[1];


			devices = deviceFriendlyName.toString().split('|').map((deviceFriendlyName, key) =>
				<Device deviceId={deviceIds[key]} friendlyName={deviceFriendlyName} key={key} _key={key} />
			)
		}

		//todo: get the following component to work in the above .map
		//<Device _key={key} text={this.props.text} />

    this.setState({
      deviceChildren: devices
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
  render() {
    return (
      <View style={styles.root}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={styles.root}>
              <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                <Text style={{ fontSize: 28, textAlign: 'center' }}>Done</Text>
              </TouchableHighlight>

              {
                this.state.deviceChildren.map((OnlineDevice) => OnlineDevice)
              }

          </View>

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
