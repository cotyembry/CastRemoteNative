import React from 'react';

import {
	NativeModules,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import store from '../store.js';

const NativeMethods = NativeModules.NativeMethods;

export default class Device extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		
		}
	}
	devicePressed() {
		//if here then the device was tapped on to be connected to

		//start animating through the cast icons until the device connects
		//this.props.startAnimation();	//this is a method passed in that starts the animation in CastIcon.js
		store.data['startAnimation']()



		NativeMethods.connectWithDeviceId(this.props.deviceKey)
	}
	render() {
		return (
			<TouchableOpacity onPress={this.devicePressed.bind(this)}>
				<View  key={this.props._key} style={styles.root}>
					<Text key={'_' + this.props._key} style={styles.deviceNameText}>{this.props.friendlyName} {this.props.deviceId}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		width: '100%'
	},
	deviceNameText: {
		fontSize: 21,
		color: 'blue',
		textAlign: 'center',
		paddingTop: 10
	}
})
