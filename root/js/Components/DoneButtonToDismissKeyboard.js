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
		this.registerInParent = this.props.registerInParent;

		this.state = {
			keyboardHasFocus: false
		}
	}
	componentDidMount() {
		//once this mounts, I need to send a callback up to the parent component so the parent can set the state of the child whenever it needs to
		// this.registerInParent(this.updateFocusHelper.bind(this))	//make sure to bind the `this` value so when the parent component calls the method, it is executing within the current scope right now
	

		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));


	}
	componentWillUnmount () {
    	this.keyboardDidShowListener.remove();
    	this.keyboardDidHideListener.remove();
  	}
	_keyboardDidHide() {
		this.setState({
			keyboardHasFocus: false
		})
	}
	_keyboardDidShow() {
		this.setState({
			keyboardHasFocus: true
		})
	}
	render() {
		if(this.state.keyboardHasFocus !== true) {
			return null;
		}

		else {
			return (
				<View style={styles.root}>
					<Text style={styles.text} onPress={Keyboard.dismiss}>Done</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	text: {
		fontSize: 17,
		color: 'blue'
	}
})
