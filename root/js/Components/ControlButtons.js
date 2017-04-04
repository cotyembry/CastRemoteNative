import React from 'react';

console.warn('in ControlButtons: add SVG buttons to view')
console.warn('in ControlButtons: finish implementing the play, pause, stop, etc... buttons')

export default class ControlButtons extends React.Component {
	render() {
		return (
			<View>
				<Play />
				<Rewind />
				<Pause />
				<FastForward />
				<Stop />
			</View>
		)
	}
}

class Play extends React.Component {
	play() {

	}
	render() {
		return (
			<View>
				{/*
					Add SVG like Play button here
				*/}
			</View>
		)
	}
}
class Pause extends React.Component {
	render() {	
		return (
			<View>
				{/*
					Add SVG like Pause button here
				*/}
			</View>
		)
	}
}
class Stop extends React.Component {
	render() {	
		return (
			<View>
				{/*
					Add SVG like Stop button here
				*/}
			</View>
		)
	}
}

class Rewind extends React.Component {
	render() {	
		return (
			<View>
				{/*
					Add SVG like Rewind button here
				*/}
			</View>
		)
	}
}
class FastForward extends React.Component {
	fastForwardSelected() {
		//for now I will stick with having 1 fast forward speed
		//set a timeout to increment/iterate on a good interval
		//save the timeout interval id in the ControlButtons Component so I can clear it later within the play, pause, and stop methods
	}
	render() {	
		return (
			<View onClick={this.fastForwardSelected.bind(this)}>
				{/*
					Add SVG like FastForward button here
				*/}
			</View>
		)
	}
}
