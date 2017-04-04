import React from 'react';

import {
	View,
	StyleSheet
} from 'react-native';

import Svg, {
    Path
} from 'react-native-svg';

export default class Stop extends React.Component {
	render() {
		return (
			<View style={styles.root}>
				<Svg width='23' height='23'>
					{/*<Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />*/}
					
					<Path d="M 0 2 L 23	2 L 23 23 L 0 23 Z" stroke="black" />

				</Svg>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		// flex: 1
	}
})
