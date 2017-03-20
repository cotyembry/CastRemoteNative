import React from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

var CastNativeModules = NativeModules.CastNativeModules;

import Chromecast from 'react-native-google-cast';



//Native Modules

/*
// Init Chromecast SDK and starts looking for devices 
Chromecast.startScan();
 
// Does what the method says. It saves resources, use it when leaving your current view 
Chromecast.stopScan();
 
// Returns a boolean with the result 
Chromecast.isConnected();
 
// Return an array of devices' names and ids 
Chromecast.getDevices();
 
// Gets the device id, and connects to it. If it is successful, will send a broadcast 
Chromecast.connectToDevice(DEVICE_ID);
 
// Closes the connection to the current Chromecast 
Chromecast.disconnect();
 
// Streams the media to the connected chromecast. Time parameter let you choose 
// in which time frame the media should start streaming 
Chromecast.castMedia(MEDIA_URL, MEDIA_TITLE, MEDIA_IMAGE, TIME_IN_SECONDS);
 
// Move the streaming media to the selected time frame 
Chromecast.seekCast(TIME_IN_SECONDS);
 
// Toggle Chromecast between pause or play state 
Chromecast.togglePauseCast();
 
// Get the current streaming time frame. It can be use to sync the chromecast to 
// your visual media controllers 
Chromecast.getStreamPosition();
*/


class Button extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={() => { this.props.onPress() }}>
          <View>
            <Text>{ typeof this.props.value !== 'undefined' ? this.props.value : 'Click Me'}</Text>
          </View>
        </TouchableOpacity>     
    )
  }
}


export default class App extends React.Component {
  castItemClicked(name, id) {
    Chromecast.connectToDevice(id);
  }
  castItemClicked2(value) {

  }
  constructor(props) {
    super(props);

    this.state = {
      children: [],
      text: 'Skip to: <Enter Value Here>',      //text should be renamed and should be considered a number (in minutes) that will be used to skip/seek to
      play: true                                //I keep this in sync with this.play that is below
    }
    this.play = true;

    this.clearIntervalIdForTimeComponent = '';

    this.deviceIsAvailableFlag = false;
  }
  componentDidMount() {
    const self = this;  //self will help me bind the this value


    Chromecast.startScan();

    // To know if there are chromecasts around 
    // DeviceEventEmitter.addListener(Chromecast.DEVICE_AVAILABLE, (existance) => console.log('\n\n\n device is available', existance.device_available, '\n\n\n'));
    DeviceEventEmitter.addListener(Chromecast.DEVICE_AVAILABLE, (event) => { this.deviceIsAvailableFlag = true; this.deviceIsAvailable.call(this, event); })
     
    // // To know if the connection attempt was successful 
    DeviceEventEmitter.addListener(Chromecast.DEVICE_CONNECTED, (event) => { alert('device did connect!!!!') });
     
    // // If chromecast started to stream the media succesfully, it will send this event 
    DeviceEventEmitter.addListener(Chromecast.MEDIA_LOADED, () => { console.log('\n\n\n media loaded \n\n\n') });
     
  }
  // componentWillUnmount() {
  //   clearInterval(this.clearIntervalIdForTimeComponent}
  // }
  showDevices(devices) {
    const self = this;

    let children = [];

    devices.map((deviceObject, i) => {
      // let keys = Object.keys(deviceObject);

          children.push(
              <TouchableOpacity key={i} onPress={ () => { this.castItemClicked(deviceObject['name'], deviceObject['id']) }  }>
                  <View>
                      <Text>{deviceObject['name']}</Text>
                  </View>
              </TouchableOpacity>
          )

    });

    this.setState({
      children: children
    }) 


  }
  deviceDidConnect(event) {
    alert('device ' + event + ' did connect!!!');
  }
  deviceIsAvailable(existance) {
    const self = this;
    Chromecast.getDevices().then(self.showDevices.bind(self));
  }
  togglePlayState() {
    // Toggle Chromecast between pause or play state 
    Chromecast.togglePauseCast();
    this.play = !this.play;           //just flip flop between true and false
    this.setState({ play: this.play }); //and also keep this.state.play in sync with this.play (TODO: remove this.play from this component)
  }
  seek() {
    // Move the streaming media to the selected time frame 
    Chromecast.seekCast(parseFloat(this.state.text));  //in seconds
  }
  render() {
    const self = this;
    var _onPressSeek = this.seek;
    _onPressSeek = _onPressSeek.bind(this);

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 32 }}>CastRemote Native</Text>

        
        
        <TouchableOpacity onPress={() => { this.deviceIsAvailable() }}>
          <View>
            <Text>clickMe</Text>
          </View>
        </TouchableOpacity>


        {this.state.children.length > 0 && this.state.children.map((ChromecastDevice) => ChromecastDevice)}


        { this.play === true &&
          <Button value='Play' onPress={ () => { self.togglePlayState() }} />
        }
        { this.play === false &&
          <Button value='Pause' onPress={ () => { self.togglePlayState() }} />
        }
        
        
   

          <TextInput
            style={{height: 40}}
            placeholder={'Seek to: <Enter number here>'}
            onChangeText={(text) => { this.setState({ text: text })}}
          ></TextInput>
       
        <Button value='Seek!' onPress={_onPressSeek} />

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
