import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chromecast from 'react-native-google-cast';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    }
  }
  componentDidMount() {


    Chromecast.startScan();

    var devices = Chromecast.getDevices();

    // To know if there are chromecasts around 
    // DeviceEventEmitter.addListener(Chromecast.DEVICE_AVAILABLE, (existance) => console.log('\n\n\n device is available', existance.device_available, '\n\n\n'));
     
    // // To know if the connection attempt was successful 
    // DeviceEventEmitter.addListener(Chromecast.DEVICE_CONNECTED, () => { console.log('\n\n\n device connected! \n\n\n') });
     
    // // If chromecast started to stream the media succesfully, it will send this event 
    // DeviceEventEmitter.addListener(Chromecast.MEDIA_LOADED, () => { console.log('\n\n\n media loaded \n\n\n') });
     

    console.log('\n\n\n\n\n\n')

    console.log('devices = ', devices);
    console.log('\n\n\n\n\n\n')

    var keys = Object.keys(devices);

    let children = [];

    keys.map((key, i) => {

      children.push(
        <View>
          <Text key={'_' + i}>{keys[i]}</Text>
          <Text key={i}>{devices[key]}</Text>
        </View>
      )
    });

    this.setState({
      children: children
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        {this.state.children.length > 0 && this.state.children.map((ChromecastDevice) => ChromecastDevice)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
