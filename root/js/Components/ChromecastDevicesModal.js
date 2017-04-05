import React from 'react';
import {
  NativeAppEventEmitter,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';

//Devices.js will handle the js talking to the native side of the code
import Devices from './Devices.js';

export default class ChromecastDevicesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      children: []            //this.children will hold the available devices as they come in and go off
    }
  }
  componentDidMount() {
    //now that the component has mounted, I will register the method for this Component to allow the parent component to update its internal state
    this.props.registerHelper(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope
    // this.registerChildWithParent(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope


    NativeAppEventEmitter.addListener('test', (body) => {
      alert('here is the grand finally... :' + body);
    })



    // This works :)
    //
    // var self = this;
    // setTimeout(function() {
    //   self.setState({
    //     children: [<Text>alsdkfj</Text>]
    //   })
    // }, 3000)


    //What is next to do is to have a native method call one of these react methods every time the device goes online and goes offline
    //  I also need to write my own, get devices method


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
    console.log('in render: ' + this.state.modalVisible)

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
                this.state.children.map((OnlineDevice) => OnlineDevice)
              }

          </View>

        </Modal>
      </View>
    );
  }
}

/*

         <View style={{marginTop: 22, flex: 1, flexDirection: 'column'}}>
          <View>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.hideButton}>Done</Text>
            </TouchableHighlight>

            <View style={{flex: 1}}>
              {this.state.modalVisible === true &&
                <Devices />
              }
              {this.state.modalVisible === false &&
                <Text>it is false...</Text>
              }
            </View>


          </View>
         </View>

*/

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
