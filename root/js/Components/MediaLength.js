import React from 'react';
import {
  Text,
  View
} from 'react-native';


export default class MediaLength extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mediaDuration: ''
    }
  }
  render() {
    return (
      <View style={{width: '100%', alignItems: 'flex-end', paddingTop: 10, paddingRight: 10}}>
        <Text>{ this.props.mediaDuration }</Text>
      </View>
    )
  }
}
