import React from 'react';
import NativeModules from 'react-native';

const NativeMethods = NativeModules.NativeMethods;

export default class SeekInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: 'minutes',
			seconds: 'seconds'
		}
	}
	componentDidMount() {
		console.warn('in SeekInput.jsx line 33: add range detection checking to make sure this is a valid value to seek to')
	}
	go() {
		let _minutes,
			_seconds,
			totalInSeconds;
		if(this.state.minutes === 'minutes') {
			_minutes = 0;
		}
		else {
			_minutes = this.state.minutes;
		}
		if(this.state.seconds === 'seconds') {
			_seconds = 0;
		}
		else {
			_seconds = this.state.seconds;
		}

		totalInSeconds = _seconds + _minutes * 60;	//converts from minutes to seconds


		//send totalInSeconds to native method to actually seek
		NativeMethods.seek(totalInSeconds);

		//check to see if there is an event that fires after seeking to the specified position

		//if there is not, set a timeout for 2000ms, then set the state for minutes and seconds back to their default values


	}
	render() {
		return(
			<View>
				<NativeNumberInput onChange={this.minuteInputChanged.bind(this)} />
				<Text>:</Text>
				<NativeNumberInput onChange={this.secondnputChanged.bind(this)} />
			

				<View onClick={this.go.bind(this)}>
					<Text>Go</Text>
				</View>
			</View>
		)
	}
}


