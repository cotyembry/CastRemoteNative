import React from 'react';

import {
	View,
	StyleSheet,
	Text
} from 'react-native';

export default class HeaderText extends React.Component {
	render() {
		return (
			<View>
				<Text style={styles.root}>CastRemote Native</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		marginTop: 70,
		fontSize: 32
	}
})
