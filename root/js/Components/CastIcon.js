import React from 'react';

import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';


export default class CastIcon extends React.Component {
	constructor(props) {
		super(props);

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
