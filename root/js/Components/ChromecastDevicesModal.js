import React from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class ChromecastDevicesModal extends React.Component {
  constructor(props) {
    super(props);

    // this.registerChildWithParent = this.props.registerHelper; //registerHelper is a method that the parent exposes to accept a function that will be used to update this ChromecastDevicesModal's internal state

    this.state = {
      modalVisible: false
    }
  }

  componentDidMount() {
    //now that the component has mounted, I will register the method for this Component to allow the parent component to update its internal state
    this.props.registerHelper(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope
    // this.registerChildWithParent(this._setStateHelper.bind(this));  //bind the `this` value so when the parent calls the function the setState method still works with respect to this current scope
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
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}