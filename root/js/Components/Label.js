import React from 'react';


//Native methods are going to have to tell me what the current media session is on.
//	I should just use polling so the js is in full control
export default class Label extends React.Component {
	constructor() {
		super(props);
		this.state = {
			labelText: ''	//this will be used to display the value of the text of the label
		}
	}
	//TODO: hook this up to the native events
	didConnectToDevice() {
		//this should be called once connected to the device
	
		//if no interval poller is registered:
		//	set up interval herer to poll for the current media session

		//set flag to know the status is connected

	}
	deviceDidDisconnect() {
		//kill interval if it exists
	}
	componentDidMount() {
		console.warn('in Label.jsx: finish didConnectToDevice method')
		//register event/notification listener for native methods message in response to this.mediaIntervalPollers
	}
	componentDidUnmount() {
		//kill interval if it exists
	}
	mediaIntervalPoller() {
		//this will call a native method
		//the return value for the native method will have to be sent fom native as a notification/event

		//so, that means Label.jsx needs to have a function as a callback listening for the event

		//call native method to actually get the current media session time
	}
	mediaPollerListener(seconds) {	//seconds is the number of seconds from the start of the current media playing
		//take in the seconds passed from the native method
		//transform the data to present to the user
		//update the view by setting the state
	}
	render() {
		let _labelText;
		if(typeof thisp.props.labelText !== 'undefined') {
			_labelText = this.props.labelText;
		}
		else {
			_labelText = this.state.labelText;
		}
		return (
			<View>
				<Text>{_labelText}</Text>
			</View>
		)
	}
}


