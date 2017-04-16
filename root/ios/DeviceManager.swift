//
//  DeviceManager.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

/*
@objc(MySwiftThingy)
class MySwiftThingy: NSObject {
  
  @objc func callbackMethod(callback: RCTResponseSenderBlock) -> Void {
    let resultsDict = [
      "success" : true
    ];
    
    callback([NSNull() ,resultsDict])
  }
  
  @objc func simpleMethod(message: String!) {
    print("\(message)")
  }
}

*/

//make instance of GlobalSwiftInstance
//var globalInstance = GlobalSwiftInstance()
var myTest = MyTest()


var cotysEventEmitterInstance = CotysEventEmitter()

var nativeMethodsInstance = NativeMethods()

var castNativeMethodsInstance = CastNativeMethods()

@objc(DeviceManager)
public class DeviceManager: NSObject, GCKDeviceManagerDelegate, GCKDeviceScannerListener, GCKMediaControlChannelDelegate  {
  
  var bridge: RCTBridge!
  
  
  var deviceManager: GCKDeviceManager?
  var deviceScanner: GCKDeviceScanner?
  var mediaControlChannel = GCKMediaControlChannel()
  
  var nilValueHelper: String?
  
  
  
  func CreateDeviceManager() -> DeviceManager {
    return DeviceManager()
  }
  
  
  
  public func supportedEvents() -> [String]! {
    return ["deviceList", "test", "deviceDidGoOnline", "deviceDidGoOffline", "deviceDidConnect", "deviceDidDisconnect", "mediaDuration"]
  }
  
  

  
  
  
  // MARK: GCKDeviceManagerDelegate
  // this should be called after the device is connected to the application
  public func deviceManagerDidConnect(_ deviceManager: GCKDeviceManager) {
    print("\n\n\n in native code, device manager did connect! \n\n\n")
    
    let __bridge = myTest.getBridge()               //this gets the bridge from the main rootView created in AppDelegate.m
    __bridge?.eventDispatcher().sendAppEvent(withName: "deviceDidConnect", body: "true")
    
    self.deviceManager?.joinApplication(nilValueHelper)
  }
  
  public func deviceManager(_ deviceManager: GCKDeviceManager, didConnectToCastApplication applicationMetadata: GCKApplicationMetadata, sessionID: String, launchedApplication: Bool) {
    print("\n joined media session on device \(deviceManager.device.friendlyName)")
    self.mediaControlChannel.delegate = self
    deviceManager.add(self.mediaControlChannel)
    self.mediaControlChannel.requestStatus()

  }
  func getMediaDuration() {
    if self.mediaControlChannel.mediaStatus?.mediaInformation != nil {
      let streamDuration = (self.mediaControlChannel.mediaStatus?.mediaInformation?.streamDuration)!
      let bridge = myTest.getBridge()
      bridge?.eventDispatcher().sendAppEvent(withName: "mediaDuration", body: streamDuration)
    }
  }
  func getDevices() -> String {
    //getDevices is called from NativeMethods._getDevices .swift which was called from js
    var devices = ""
    var deviceIds = ""
    var deviceObjects = [Any]()
    var iterationHelper = 0
    
    
    print("in getDevices in DeviceManager.swift\n\n\n")
    
    //DispatchQueue.main.async {
      
      //nativeMethodInstance
      
      //let identifier =  Bundle.main.bundleIdentifier
      //var deviceToConnectTo: GCKDevice?
      if let deviceScanner = self.deviceScanner {
        deviceScanner.passiveScan = false
        for device in deviceScanner.devices {
          let deviceName = (device as! GCKDevice).friendlyName
          
          deviceObjects.append(device)
          
          if(iterationHelper == 0) {
            iterationHelper = 1
            devices = deviceName!
            
            print("in getDevices: \((device as! GCKDevice).deviceID)")
            
            deviceIds = (device as! GCKDevice).deviceID
            
          }
          else {
            devices = devices + "|" + deviceName!
            deviceIds = deviceIds + "|" + (device as! GCKDevice).deviceID
          }
        
          print("\n\n\n in DeviceManger.swift, sendingDevice list as: \(devices)")
          
          //now that I have collected the device's friendlyNames I can send this to the javascript side
          //nativeMethodSendEvent(eventName: "deviceList", body: devices)
          
          //nativeMethodInstance.emitEvent(eventName: "deviceList", body: devices)
          
          //sendEventToJS(body: devices)
          
          
          
          nativeMethodsInstance.devices = devices             //set the new devices string up
          nativeMethodsInstance.deviceObjects = deviceObjects //keep a reference to the objects
          
          //self.emitEvent(eventName: "deviceList", body: devices)
          
          deviceScanner.passiveScan = true
        }
      }
    //}
    
    return devices + "_?splitOnThis?_" + deviceIds
  }
  
  func connectWithDeviceId(deviceIdToConnectTo: String) {
    print("\n about to connect \n")
    DispatchQueue.main.async {
      // [START device-selection]
      let identifier =  Bundle.main.bundleIdentifier
      var deviceToConnectTo: GCKDevice?
      if let deviceScanner = self.deviceScanner {
        deviceScanner.passiveScan = false
        for device in deviceScanner.devices {
          let deviceName = (device as! GCKDevice).friendlyName
          let deviceId = (device as! GCKDevice).deviceID
          //if(deviceName == "Coty's Chromecast") {
          
          //if(deviceName == "Coty's Newest Chromecast") {
          
          print("here \n\n")
          print((device as! GCKDevice).deviceID)
          print(deviceIdToConnectTo)
          
          //if((device as! GCKDevice).deviceID == deviceIdToConnectTo) {
          if(deviceId == deviceIdToConnectTo) {
          
            print("in if: about to connect: \(deviceName)\n")
            deviceToConnectTo = (device as! GCKDevice) //this should crash if the device is nil
            self.deviceManager = GCKDeviceManager(device: deviceToConnectTo!, clientPackageName: identifier!)
            self.deviceManager?.delegate = self
            self.deviceManager?.connect()
          }
        }
        //deviceScanner.stopScan()
        deviceScanner.passiveScan = true
      }
    }

  }
  
  func scan() {
    DispatchQueue.main.async {
      let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
      // Initialize device scanner, then add the listener
      self.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
      if let deviceScanner = self.deviceScanner {
        print("adding deviceScanner Listener!\n")
        deviceScanner.add(self as GCKDeviceScannerListener)
        deviceScanner.startScan()
        deviceScanner.passiveScan = false
        deviceScanner.passiveScan = true
      }
    }
  }
  func seek(numberToSeekTo: String) {
    let convertedFloat = Float(numberToSeekTo)
    
    let skipToHere: TimeInterval = TimeInterval(convertedFloat!)

    print("Skipping to: \(skipToHere)")
    
    //I'll use this to seek to the media position specified
    self.mediaControlChannel.seek(toTimeInterval: skipToHere)

  }
  func stop() {
    self.mediaControlChannel.stop()
  }
  func play() {
    //var instance = GlobalSwiftInstance()
    //instance.setBridge()
    
    //print("setting bridge\n")
    
    
    self.mediaControlChannel.play()
  }
  func pause() {
    self.mediaControlChannel.pause()
  }
  func disconnect() {
    DispatchQueue.main.async {
      self.deviceManager?.disconnect()
      let __bridge = myTest.getBridge()               //this gets the bridge from the main rootView created in AppDelegate.m
      __bridge?.eventDispatcher().sendAppEvent(withName: "deviceDidDisconnect", body: "true")
    }
  }
  
  @objc(deviceDidComeOnline:)
  public func deviceDidComeOnline(_ device: GCKDevice) {
    print("\n device \(device.friendlyName!) did come online \(device) \n")
    
    /*
     [_bridge enqueueJSCall:@"RCTDeviceEventEmitter"
     method:@"emit"
     args:body ? @[eventName, body] : @[eventName]
     completion:NULL];
    */
    
    
    //globalInstance.sendEvent()
    
    let __bridge = myTest.getBridge()               //this gets the bridge from the main rootView created in AppDelegate.m
    //globalInstance.sendEvent(withBridge: bridge!)
    
    print("__bridge = \(__bridge)")
    
    __bridge?.eventDispatcher().sendAppEvent(withName: "test", body: ["Yo"])
    
    
    __bridge?.eventDispatcher().sendAppEvent(withName: "deviceDidGoOnline", body: [device.deviceID, device.friendlyName])
    
    //self.sendEvent(withName: "test", body: "device: \(device.friendlyName)")
    
    
    //cotysEventEmitterInstance.eventEmitterInstance.sendEvent()
    
    
    //cotysEventEmitterInstance.initEmitter()
    
    //now to send a Native event to the js side
    //nativeMethodsInstance.testEvent()
    
    //castNativeMethodsInstance.regularFunction()
    //var callbackHelper: RCTResponseSenderBlock!
    
    
    //nativeMethodsInstance.getDevices()
    
    //self.sendEvent(withName: "test", body: "messageBodyFromOnlineEvent")
  }
  public func deviceDidGoOffline(_ device: GCKDevice) {
    print("\n device \(device.friendlyName!) did come online \(device) \n")
    
    let __bridge = myTest.getBridge()               //this gets the bridge from the main rootView created in AppDelegate.m
    //globalInstance.sendEvent(withBridge: bridge!)
    
    print("__bridge = \(__bridge)")
    
    __bridge?.eventDispatcher().sendAppEvent(withName: "deviceDidGoOffline", body: [device.deviceID, device.friendlyName])
    
  }
  
  func emitEvent(eventName: String, body: Any) {
    //self.sendEvent(withName: eventName, body: body)
  }
}
