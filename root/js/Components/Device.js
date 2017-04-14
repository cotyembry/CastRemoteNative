import React from 'react';

import {
	NativeModules,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const NativeMethods = NativeModules.NativeMethods;

export default class Device extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		
		}
	}
	devicePressed() {
		//if here then the device was tapped on to be connected to
		//alert(this.props._key)

		NativeMethods.connectWithDeviceId(this.props.friendlyName)
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
		textAlign: 'center',
		paddingTop: 10
	}
})
