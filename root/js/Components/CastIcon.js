import React from 'react';

import {
	Image,
	NativeEventEmitter,
	NativeModules,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import store from '../store.js';

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

		//what function needs to happen when the button is pressed inside of this component Coty...
		//1. dismiss modal
		//.    do this later
		//2. start the animation
		//.    how?
		//	-register function that calls `this.startAnimation` that is put in the store as a global callback

		store.register('startAnimation', this.startAnimation.bind(this))
		store.register('deviceDidConnect', this.deviceDidConnect.bind(this))


		//setup listeners for Native events
		//create the instance of the event emitter so I can listen to the native events that get sent to the js side
	    this.eventEmitter = new NativeEventEmitter(NativeMethods);
	    // this.subscription = this.eventEmitter.addListener('deviceList', this.deviceListCallback.bind(this));
	    this.subscription1 = this.eventEmitter.addListener('deviceDidConnect', this.deviceDidConnect.bind(this));
	    this.subscription2 = this.eventEmitter.addListener('deviceDidDisconnect', this.deviceDidDisconnect.bind(this));
	    this.subscription3 = this.eventEmitter.addListener('deviceDidGoOffline', this.deviceDidDisconnect.bind(this));
    




	}
	componentWillUnmount() {
		this.subscription1.remove();
		this.subscription2.remove();
		this.subscription3.remove();
	}
	conditionalImage() {
		let _Image;
		//I have to do this switch statement because Image Components must have a static source attribute (i.e. not one that is like require('./somepath/' + dynamicPathMaybe + '/index.js')) - the whole point of the static file path is because of them wanting to stop that dynamic filepath behavior...Anyways, if it didn't before, hopefully it makes more sense now
		switch(this.state.activeIcon) {
			case 'one':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image style={styles.image} source={require('../../assets/cast_icons_material/res/ios/ic_cast0_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'two':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image style={styles.image} source={require('../../assets/cast_icons_material/res/ios/ic_cast1_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'three':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image style={styles.image} source={require('../../assets/cast_icons_material/res/ios/ic_cast2_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'connected':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image style={styles.image} source={require('../../assets/cast_icons_material/res/ios/ic_cast_connected_black_24dp.png')} /></TouchableOpacity>
				break;
			case 'notConnected':
				_Image = <TouchableOpacity onPress={this._onPress.bind(this)}><Image style={styles.image} source={require('../../assets/cast_icons_material/res/ios/ic_cast_black_24dp.png')} /></TouchableOpacity>
				break;
		}

		return _Image
	}
	deviceDidConnect(body) {
		clearInterval(this.animationIntervalId)
		this.setState({
			activeIcon: 'connected'
		})

		//now update the media label
		//store.data['setMediaDuration']()
		NativeMethods.getMediaDuration();
	}
	deviceDidDisconnect(body) {
		this.setState({
			activeIcon: 'notConnected'
		})
	}
	onLoad(event) {
		console.log(event)
	}

	//these next two variables will help me in the startAnimation method below
	animationIncrement = 1
	animationIntervalId = ''

	startAnimation() {
		//startAnimation gets called by exposing its self in ../store.js and at the moment of this writing is only getting called from Device.js initiating it
		
		store.data['dismissModal']()	//call the exposed function to dismiss the ChromecastDevicesModal.js Component

	/*
		case 'one':
		case 'two':
		case 'three':
		case 'connected':
		case 'notConnected':
	*/

		//this was kind of fun building this, its the night before easter right now
		/*
			I just want to thank Jesus Christ for everything he has done for me. Let this app further His kingdom
			Jesus Christ is Lord
		*/
		var callback = function(e) {
			console.log('in setInterval, inc = ', this.animationIncrement, e)
			switch(this.animationIncrement) {
				case 1:
					this.setState({
						activeIcon: 'one'
					})
					break;
				case 2:
					this.setState({
						activeIcon: 'two'
					})

					break;

				case 3:
					this.setState({
						activeIcon: 'three'
					})

					break;

				case 4:
					this.setState({
						activeIcon: 'two'
					})

					//re-go through the animation sequence again
					this.animationIncrement = 0;
					break;

				default:
					clearInterval(this.animationIntervalId)
			}

			//every iteration keep iterating through the different icons
			this.animationIncrement++
		}


		//now that the callback is created bind `this` so that the `this` value is correct event in the callback of the setInterval function
		callback = callback.bind(this);
		this.animationIntervalId = setInterval(callback, 500)
	}
	_onPress() {
		if(typeof this.props.showModal === 'function') {
			//I will start the method call to trigger the native code to get a list of the active devices
			//then the event listener in ChromecastDevicesModal will be able to respond the the reply from Native that will be in the form of a message/event
			NativeMethods.getDevices();
			NativeMethods.getDevices();


			this.props.showModal({modalVisible: true});
		}
		else {
			console.warn('Warning: in CastIcon.js: in onPress, typeof this.state.showModal !== function');
		}
	}

	render() {
		//conditionalImage returns the image to render based on this.state.activeIcon
		let _Image = this.conditionalImage();
		return (
			<View style={styles.root}>
				{ _Image }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	//Header.js defines the height for the header of the app to be `70`
	root: {
		flexDirection: 'column',
		flex: 1,
		height: 42,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	image: {
		// flex: -1,
		// height: '100%',
		width: 42,
		height: 42,
		shadowColor: 'white',
		shadowOffset: {
			width: 0,
			height: 0	
		},
		shadowRadius: 10,
		shadowOpacity: 1.0
	}
})
