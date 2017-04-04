import React from 'react';

import {
	View
} from 'react-native';

import Svg, {
    Path
} from 'react-native-svg';

export default class Pause extends React.Component {
	render() {
		return (
			<View>
				<Svg width='23' height='23'>
					
					<Path d="M 0 2 L 9 2 L 9 23 L 0 23 Z" stroke="black" />
					<Path d="M 12.5 2 L 22.5 2 L 21.5 23 L 12.5 23 Z" stroke="black" />
					{/*<Path d="M 0 2 L 23 2" stroke="black" />*/}

				</Svg>
			</View>
		)
	}
}
