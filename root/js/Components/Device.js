import React from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

export default class Device extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		
		}
	}

	render() {
		return (
			<View style={styles.root}>
				<Text style={styles.alignText}>{this.props.text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		width: '100%'
	},
	alignText: {
		fontSize: 20,
		textAlign: 'center'
	}
})
