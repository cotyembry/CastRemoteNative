import React from 'react';

import {
	Image,
	NativeModules,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

var NativeMethods = NativeModules.NativeMethods;

export default class CastIcon extends React.Component {
	constructor(props) {
		super(props);

		// this.updateDeviceList = this.props.updateDeviceList;
		// this.notifyParent = this.props.onPress;

		this.state = {
			activeIcon: 'notConnected'			//activeIcon's value will be used as the key to select each particular url to display the correct picture to the user; it can be any of the above keys: (one, two, three, connected, disconnected)
		}
	}
	componentDidMount() {

		// go through animation for the chromecast
		// this.state.activeIcon
	}
	conditionalImage() {
		let _Image;
		//I have to do this switch statement because Image Components must have a static source attribute (i.e. not one that is like require('./somepath/' + dynamicPathMaybe + '/index.js')) - the whole point of the static file path is because of them wanting to stop that dynamic filepath behavior...Anyways, if it didn't before, hopefully it makes more sense now
		switch(this.state.activeIcon) {
			case 'one':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast0_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'two':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast1_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'three':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast2_black_24dp.png')} /></TouchableOpacity>

				break;
			case 'connected':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast_connected_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'notConnected':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast_black_24dp.png')} /></TouchableOpacity>

				break;
		}

		return _Image
	}
	_onPress() {
		if(typeof this.props.showModal === 'function') {
			//I will start the method call to trigger the native code to get a list of the active devices
			//then the event listener in ChromecastDevicesModal will be able to respond the the reply from Native that will be in the form of a message/event
			NativeMethods._getDevices((error, events) => {
				if(error) {
					console.log('in _getDevices method on CastIcon.js: error = ', error);
				}
				else {
					//send the asyncronous callback result up to the ChromecastDevicesModal Component and update it's state
					this.props.updateDeviceList(events.toString());
				}
			})

			this.props.showModal({modalVisible: true});
		}
		else {
			console.warn('Warning: in CastIcon.js: in onPress, typeof this.state.showModal !== function');
		}
	}
	render() {
		//conditionalImage returns the image to render based on this.state.activeIcon
		let _Image = this.conditionalImage(this);
		return (
			<View onPress={() => {console.log('pressed!') }}>
				{ _Image }
			</View>
		)
	}
}
