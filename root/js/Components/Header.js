import React from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import CastIcon from './CastIcon.js';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			iconNumber: 0	//0 will be the offline chromecast icon I suppose
		}
	}
	render() {
		return (
			<View style={StyleSheet.flatten([styles.root, styles.buttonContainer])}>
				<CastIcon number={this.state.iconNumber} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		width: '100%',
		height: 70,
		flexDirection: 'row',
		alignItems: 'center',			//centers vertically
		justifyContent: 'flex-end'
	},
	buttonContainer: {
		backgroundColor: '#cccccc',
		// borderRadius: 10,
		padding: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 5,
		shadowOpacity: 1.0
	}
})
