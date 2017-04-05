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

		// this.showModalHelper = this.props.showModal;	//this is exposed in App.js so I just bring it in here as well to use

		this.state = {
			iconNumber: 0,			//0 will be the offline chromecast icon I suppose
			modalIsVisible: false
		}
	}
	// _notifyParent() {
	// 	//when this is called, that means the CastIcon was clicked
	// 	if(this.state.modalIsVisible === false && typeof this.props.showModal === 'function') {
	// 		//show the modal
	// 		this.props.showModalHelper();
	// 	}
	// }
	render() {
		return (
			<View style={StyleSheet.flatten([styles.root, styles.buttonContainer])}>
				
				{/* notifyParent is called when the CastIconIsPressed */}
				<CastIcon showModal={this.props.showModal} number={this.state.iconNumber} />
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
