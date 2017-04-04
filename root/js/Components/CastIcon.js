import React from 'react';

import {
	Image,
	Text,
	View
} from 'react-native';

console.warn('in CastIcon.jsx: add appropriate urls for the cast icon media')
console.warn('in CastIcon.jsx: figure out how to render an image to the screen');

export default class CastIcon extends React.Component {
	constructor(props) {
		super(props);

		// this.iconPaths = {
		// 	one: '../../assets/CastIcons/connecting1.png',
		// 	two: '../../assets/CastIcons/connecting2.png',
		// 	three: '../../assets/CastIcons/connecting3.png',
		// 	connected: '../../assets/CastIcons/connected.png',
		// 	notConnected: '../../assets/CastIcons/notConnected.png'
		// }
		// this.test = '../../assets/cast_icons_material/res/ios_2x/ic_cast0_black_24dp.png',
		this.test = '../../assets/CastIcons/notConnected.png',
		
		this.iconPaths = {
			one: '../../assets/cast_icons_material/res/ios_2x/ic_cast0_black_24dp.png',
			// two: '../../assets/cast_icons_material/res/',
			// three: '../../assets/cast_icons_material/res/',
			// connected: '../../assets/cast_icons_material/res/',
			// notConnected: '../../assets/cast_icons_material/notConnected@2x.png'
		}

		this.state = {
			activeIcon: 'one'			//activeIcon's value will be used as the key to select each particular url to display the correct picture to the user; it can be any of the above keys: (one, two, three, connected, disconnected)
		}
	}
	componentDidMount() {
		let _state = {};
		// do an animation switch between the images
		// end on an icon that either means 'there are chromecasts available - online'
		// or an icon that means 'there are no chromecasts available - offline'

		// 1232 -> cycle through these over and over until it connects
		//	 maybe just get it toggling between connected and disconnected icons for now and add more later when this is more stable

		// if(this.isConnecting === true) {
		// 	if (this.connected === true) {
		// 		//set activeIcon to be 'connected' to display the all blue icon/connected icon
		// 	}
		// 	else {
		// 		//sequence through chomecast's icon/logo's in an animation way
		// 		//	maybe for now just set it to one image while connecting for the beginning
		// 	}
		// }




	}
	render() {
		return (
			<View>
				<Text>CastIcon.js</Text>
				{/*<Image source={require(this.iconPaths[this.state.activeIcon])} />*/}
				<Image source={require('../../assets/cast_icons_material/res/ios_2x/ic_cast0_black_24dp.png')} />
				{/*<Image source={require('../../assets/CastIcons/notConnected.png')} /> */}
			</View>
		)
	}
}
