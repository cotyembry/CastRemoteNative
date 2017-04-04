import React from 'react';
import {
	Keyboard,
	Text,
	View,
	StyleSheet
} from 'react-native';


//this should only be viewable when the keyboard is active
export default class DoneButtonToDismissKeyboard extends React.Component {
	constructor(props) {
		super(props);

		//updateFocus will be a function that is passed in to expose this components set state method to cause a re-render
		//TODO: look and see if this is what I want to do here...I am getting sleepy and think this might be sort of the
		//direction I need to go, but I dont think this is exactly correct and I might be a bit confused/have this exactly
		//opposite of what It really needs to be.
		this.updateFocusHelper = this.props.updateFocus;

		this.state = {
			keyboardHasFocus: false
		}
	}
	updateFocusHelper(keyboardHasFocusFlag) {
		this.setState({
			keyboardHasFocus: keyboardHasFocusFlag
		})
	}
	render() {
		if(this.state.keyboardHasFocus !== true) {
			return null;
		}

		else {
			return (
				<View>
					<Text style={styles.text} onPress={Keyboard.dismiss}>Done</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		color: 'blue'
	}
})
