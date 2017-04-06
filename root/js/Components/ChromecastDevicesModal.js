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

var NativeMethods = NativeModules.NativeMethods;

export default class ChromecastDevicesModal extends React.Component {
  constructor(props) {
    super(props);


    //create the instance of the event emitter so I can listen to the native events that get sent to the js side
    this.eventEmitter = new NativeEventEmitter(NativeMethods);
    this.subscription = this.eventEmitter.addListener('deviceList', this.deviceListCallback.bind(this));


    this.state = {
      modalVisible: false,
      deviceChildren: []            //this.deviceChildren will hold the available devices as they come in and go off
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
    let devices = [];
    devices = this.deviceString.split('|').map((deviceFriendlyName) =>
        <View style={styles.deviceNameStyle}>
          <Text>{deviceFriendlyName}</Text>
        </View>
    )

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
  deviceNameStyle: {
    flexDirection: 'row',
    fontSize: 28,
    textAlign: 'center'
  },
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
