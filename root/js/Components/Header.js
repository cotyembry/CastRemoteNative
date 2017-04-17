import React from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import CastIcon from './CastIcon.js';

import Device from './Device.js';

import store from '../store.js';

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		// this.showModalHelper = this.props.showModal;	//this is exposed in App.js so I just bring it in here as well to use

		this.state = {
			iconNumber: 0,			//0 will be the offline chromecast icon I suppose
			modalIsVisible: false,
			// availableDevices: ''	//this will hold the components to render as the device status changes to and from online and offline
		}
	}

	_updateDeviceList(devicesString) {	//_updateDeviceList is passed in to <CastIcon /> to allow it to update this component's internal state - it gets called when the user taps on the CastIcon
		let AvailableDevices = devicesString.split(',').map((deviceFriendlyName, _key) =>
			<Device text={deviceFriendlyName} key={_key} />
		)

		this.props.updateDeviceList(AvailableDevices);	//updateDeviceList is passed in from App.js (at the current moment in the project/Component structure) to allow this component to update it's internal state; this sends the AvailableDevices Components up another layer to be passed into the ChromecastDevicesModal Component so they can be rendered inside there

		console.log('in _updateDeviceList in Header.js', AvailableDevices);

		// this.setState({
		// 	availableDevices: AvailableDevices
		// })
	}
	render() {
		return (
			<View style={StyleSheet.flatten([styles.root, styles.buttonContainer])}>
				
				{/* notifyParent is called when the CastIconIsPressed */}
				<CastIcon updateDeviceList={this._updateDeviceList.bind(this)} showModal={this.props.showModal} number={this.state.iconNumber} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		// flex: 1,
		width: '100%',
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',			//centers vertically
		justifyContent: 'flex-end',


		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 1.0

	},
	buttonContainer: {
		// height: '100%',
		backgroundColor: '#cccccc',
		// borderRadius: 10,
		padding: 10,
		paddingTop: 21,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 10,
		shadowOpacity: 1.0
	}
})
