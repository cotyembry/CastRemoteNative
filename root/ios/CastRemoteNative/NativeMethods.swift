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


public var reactsBridgePublicInstance: RCTBridge!



public var deviceManagerInstance = DeviceManager()  //DeviceManager.swift instance
var nativeMethodInstance = NativeMethods()


public func setDeviceList() {
  print("in: setDeviceList")
  nativeMethodsInstance.devices = "setDeviceListWasCalled"
}


@objc(NativeMethods)
public class NativeMethods: RCTEventEmitter {
  var getDevicesCallback: RCTResponseSenderBlock!
  var deviceObjects = [Any]()
  
  var devices: Any! {
    get {
      return self.devices
    }
    set(newDevices) {
      print("in devices property setter: \(newDevices)")
    }
  }
  @objc(myTest)
  func myTest() {
    print("in myTest")
  }
  @objc(connectWithDeviceId:)
  func connectWithDeviceId(deviceId: String) {
    print("about to connect to device with id = \(deviceId)")
    deviceManagerInstance.connectWithDeviceId(deviceIdToConnectTo: deviceId)
  }
  @objc(getDevices)
  func getDevices() {
    print("\n\n\nin _getDevices .swift file\n\n\n")
    //DispatchQueue.global(qos: DispatchQoS.QoSClass.default).async {}
    DispatchQueue.main.async {
      deviceManagerInstance.scan()
      let devices = deviceManagerInstance.getDevices()
      self.sendEvent(withName: "deviceList", body: devices)
      print("\n\n\nin func getDevices, devices = \(devices)\n\n\n")
    }
  }
  override public func supportedEvents() -> [String]! {
    //I will be honest, I am sending these events from DeviceManager.swift, but react native's packager gripes if I dont put the events that DeviceManager.swift is sending through the rootView's bridge here
    return ["deviceList", "test", "deviceDidGoOnline", "deviceDidGoOffline", "deviceDidConnect", "deviceDidDisconnect", "mediaDuration"]
  }
  @objc(fastForward)
  func fastForward() {
    deviceManagerInstance.fastForward()
  }
  @objc(getMediaDuration)
  func getMediaDuration() {
    deviceManagerInstance.getMediaDuration()  //an event will be send through the react native bridge for the response to this
  }
  @objc(rewind)
  func rewind() {
    deviceManagerInstance.rewind()
  }
  @objc(scan)
  func scan() {
    deviceManagerInstance.scan()        //do this first to set up the device scanner
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
    deviceManagerInstance.play()
  }
  @objc(pause)
  func pause() {
    deviceManagerInstance.pause()
  }
  @objc(test)
  func test() {
    self.emitEvent(eventName: "test", body: "test")
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

