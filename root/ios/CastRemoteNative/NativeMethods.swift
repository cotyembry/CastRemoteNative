//
//  NativeMethods.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//  I didn't want to remove the below comment because that is when I first wrote this iOS program without react-native. It was pretty bad lol, but it worked so I used a bunch of the code from it and I like to keep the date of when I started it
//
//  ChromeCastWorkFiles.swift
//  CastRemote
//
//  Created by Coty Embry on 12/27/15.
//  Copyright © 2015 cotyembry. All rights reserved.
//

//

//var nativeMethodsInstance = NativeMethods()


public func sayHello() {
  print("\n\n\n in myTest public func \n\n\n")
}




public var deviceManagerInstance = DeviceManager()  //DeviceManager.swift instance

var nativeMethodInstance = NativeMethods()

public func setDeviceList() {
  
  print("in: setDeviceList")
  nativeMethodsInstance.devices = "setDeviceListWasCalled"
}

/*
let nativeMethodInstance = NativeMethods()

public func sendEventToJS(body: String) {

  
  print("in sendEventToJS: body = \(body)")
  //now that I have the devices that are available, I will pass this to javascript in the form of an event
  //self.emitEvent(eventName: "deviceList", body: deviceListString)
  
  nativeMethodInstance.emitEvent(eventName: "deviceList", body: body)
}
*/



@objc(NativeMethods)
public class NativeMethods: RCTEventEmitter {

  var getDevicesCallback: RCTResponseSenderBlock!
  
  var devices: Any! {
    get {
      return self.devices
    }
    set(newDevices) {
      print("in devices property setter: \(newDevices)")
      
      //self.getDevicesCallback()
      
      
      //self.emitEvent(eventName: "test", body: "in setter!")
    }
  }

  
  @objc(myTest)
  func myTest() {
    print("in myTest")
  }
  
  
  @objc(getDevices)
  func getDevices() {
    print("\n\n\nin _getDevices .swift file\n\n\n")
    
    
    
    //DispatchQueue.global(qos: DispatchQoS.QoSClass.default).async {}
    DispatchQueue.main.async {
      deviceManagerInstance.scan()
      
      let devices = deviceManagerInstance.getDevices()
      
      self.sendEvent(withName: "test", body: devices)
      

    
      print("\n\n\nin func getDevices, devices = \(devices)\n\n\n")
      
    }
  }
  
      
    
  /*
    
    //_getDevices is called from javascript when the user taps the chromecast button
    //1st you have to setup a device scanner so I do that here
    deviceManagerInstance.scan()
    //2nd call the native method to start searching for available devices
    deviceManagerInstance.getDevices()
    
    var events = ["1", "2"]
    callback([-1, events]);
    //self.getDevicesCallback = callback //store a reference to the callback to invoke it once I have the available devices list built
  }
  */
  
  /*
  @objc(setCallbackRef:)
  func setCallbackRef(_callbackRef: @escaping RCTResponseSenderBlock) {
    self.callbackRef = _callbackRef
  }
  */
  
  override public func supportedEvents() -> [String]! {
    return ["deviceList", "test"]
  }
  
  @objc(scan)
  func scan() {
    deviceManagerInstance.scan()        //do this first to set up the device scanner
  }
  //@objc(getDevices)
  //func getDevices() {
    //I am moving the following logic to the _getDevices method
    //
    //this will do another function call when it is done to `sendEventToJS` that is defined above
    //deviceManagerInstance.getDevices()
  //}
  @objc(connect)
  func connect() {
    deviceManagerInstance.connect()
  }
  @objc(disconnect)
  func disconnect() {
    deviceManagerInstance.disconnect()
  }
  @objc(seek:)
  func seek(numberToSeekTo: String) {
    deviceManagerInstance.seek(numberToSeekTo: numberToSeekTo)
  }
  @objc(stop)
  func stop() {
    deviceManagerInstance.stop()
  }
  @objc(play)
  func play() {
    self.testEvent()
    
    //nativeMethodsInstance.emitEvent(eventName: "test", body: "hardCodedBodyValue")
    
    
    //deviceManagerInstance.play()
  }
  @objc(pause)
  func pause() {
    deviceManagerInstance.pause()
  }
  
  
  //@objc(test:body:)
  //func test(eventName: String, body: Any) {
  
  //test works to send an event to js, so I wouldnt mess it up and just leave it for reference
  @objc(test)
  func test() {
    
    self.emitEvent(eventName: "test", body: "test")
    
    //self.emitEvent(eventName: "test", body: "testBodyStringFromNativeiOS")
  }
  /* Coty added 04-05-2017 this emitEvent method took longer than you know to get working... */
  func emitEvent(eventName: String, body: Any) {
    
    print("in emitEvent: \(eventName), \(body)")
    
    self.sendEvent(withName: eventName, body: body)
  }
}

public extension NativeMethods {
  //this testEvent function call worked as well so don't change it to keep it as an example
  //this enables me to be able to still say `self.emitEvent(...)` since for some reason, unless I use the self value to emit the event to the js side, the _bridge value is undefined in React's RCTEventEmitter.h (or RCTBridgeModule.h, or RCTBridge.h - one of those, but I think the first one mentioned is correct)
  //for instance, I could not do `var nativeMethodsInstance = new NativeMethods(); nativeMethodsInstance.emitEvent(...) (this would turn into a runtime error with the `bridge` not being defined
  public func testEvent() {
    print("\n\n\n in testEvent, about to call sendEvent \n\n\n")
    self.sendEvent(withName: "test", body: "test")
  }
}

