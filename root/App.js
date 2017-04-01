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


//Native Modules
var NativeMethods = NativeModules.NativeMethods;


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
    //Chromecast.connectToDevice(id);
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
  }
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
    //Chromecast.getDevices().then(self.showDevices.bind(self));
  }
  togglePlayState() {
    // Toggle Chromecast between pause or play state 
    //Chromecast.togglePauseCast();
    

    this.play = !this.play;           //just flip flop between true and false
    this.setState({ play: this.play }); //and also keep this.state.play in sync with this.play (TODO: remove this.play from this component)
  }
  connect() {
    NativeMethods.connect();
  }
  playMedia() {
    NativeMethods.play();
  }
  pause() {
    NativeMethods.pause();
  }
  scan() {
    NativeMethods.scan();
  }
  seek() {
    NativeMethods.seek();
  }
  stop() {
    NativeMethods.stop();
  }


  render() {

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
       
        {/*<Button value='Seek!' onPress={_onPressSeek} />       
        
        
        <Button value='setUp' onPress={_onPressSetup} />
        <Button value='Connect' onPress={_onPressConnect} />
        <Button value='Join Session' onPress={_onPressJoinSession} />
        */}
      
        <Button value='Scan' onPress={this.scan.bind(this)} />
        <Button value='Connect' onPress={this.connect.bind(this)} />
        <Button value='Play' onPress={this.playMedia.bind(this)} />
        <Button value='Pause' onPress={this.pause.bind(this)} />
        <Button value='Seek' onPress={this.seek.bind(this)} />
        <Button value='Stop' onPress={this.stop.bind(this)} />
      
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
