import React from 'react';

import {
	View
} from 'react-native';

import Svg, {
    Path
} from 'react-native-svg';

export default class Play extends React.Component {
	render() {
		return (
			<View>
				<Svg width='23' height='23'>
					{/*<Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />*/}
					
					<Path d="M 0 2 L 23	10.5 L 0 23 Z" stroke="black" />

				</Svg>
			</View>
		)
	}
}
