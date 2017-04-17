import React from 'react';

import {
	View,
	StyleSheet,
	Text
} from 'react-native';

export default class HeaderText extends React.Component {
				//<Text style={styles.root}>{typeof this.props.text === '' || 'undefined' ? 'CastRemote Native' : this.props.text }</Text>
	render() {
		return (
			<View>
				<Text style={styles.root}>{typeof this.props.text === 'undefined' || this.props.text === '' ? 'CastRemote Native' : this.props.text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		marginTop: 21,
		fontSize: 32,
		textAlign: 'center'
	}
})
