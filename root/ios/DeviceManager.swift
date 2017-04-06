//
//  DeviceManager.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

var cotysEventEmitterInstance = CotysEventEmitter()

var nativeMethodsInstance = NativeMethods()

var castNativeMethodsInstance = CastNativeMethods()

@objc(DeviceManager)
public class DeviceManager: RCTEventEmitter, GCKDeviceManagerDelegate, GCKDeviceScannerListener, GCKMediaControlChannelDelegate {
  
  var deviceManager: GCKDeviceManager?
  var deviceScanner: GCKDeviceScanner?
  var mediaControlChannel = GCKMediaControlChannel()
  
  var nilValueHelper: String?
  
  
  
  func CreateDeviceManager() -> DeviceManager {
    return DeviceManager()
  }
  
  
  
  override public func supportedEvents() -> [String]! {
    return ["deviceList", "test"]
  }
  
  

  
  
  
  // MARK: GCKDeviceManagerDelegate
  // this should be called after the device is connected to the application
  public func deviceManagerDidConnect(_ deviceManager: GCKDeviceManager) {
    print("\n\n\n in native code, device manager did connect! \n\n\n")
    self.deviceManager?.joinApplication(nilValueHelper)
  }
  
  public func deviceManager(_ deviceManager: GCKDeviceManager, didConnectToCastApplication applicationMetadata: GCKApplicationMetadata, sessionID: String, launchedApplication: Bool) {
    print("\n joined media session on device \(deviceManager.device.friendlyName)")
    self.mediaControlChannel.delegate = self
    deviceManager.add(self.mediaControlChannel)
    self.mediaControlChannel.requestStatus()

  }
  /*
  - (void) emitMessageToRN: (NSString *) eventName: (NSDictionary *) params {
   [self.bridge.eventDispatcher sendAppEventWithName: eventName body: params];
  }
  */
  func getDevices() -> String {
    //getDevices is called from NativeMethods._getDevices .swift which was called from js
    var devices = ""
    var iterationHelper = 0
    
    
    //DispatchQueue.main.async {
      
      //nativeMethodInstance
      
      //let identifier =  Bundle.main.bundleIdentifier
      //var deviceToConnectTo: GCKDevice?
      if let deviceScanner = self.deviceScanner {
        deviceScanner.passiveScan = false
        for device in deviceScanner.devices {
          let deviceName = (device as! GCKDevice).friendlyName
          
          if(iterationHelper == 0) {
            iterationHelper = 1
            devices = deviceName!
          }
          else {
              devices = devices + "|" + deviceName!
          }
        
          print("\n\n\n in DeviceManger.swift, sendingDevice list as: \(devices)")
          
          //now that I have collected the device's friendlyNames I can send this to the javascript side
          //nativeMethodSendEvent(eventName: "deviceList", body: devices)
          
          //nativeMethodInstance.emitEvent(eventName: "deviceList", body: devices)
          
          //sendEventToJS(body: devices)
          
          
          
          //nativeMethodsInstance.devices = devices //set the new devices string up
          
          
          //self.emitEvent(eventName: "deviceList", body: devices)
          
          deviceScanner.passiveScan = true
        }
      }
    //}
    
    return devices
  }
  
  func connect() {
    print("\n about to connect \n")
    DispatchQueue.main.async {
      // [START device-selection]
      let identifier =  Bundle.main.bundleIdentifier
      var deviceToConnectTo: GCKDevice?
      if let deviceScanner = self.deviceScanner {
        deviceScanner.passiveScan = false
        for device in deviceScanner.devices {
          let deviceName = (device as! GCKDevice).friendlyName
          //if(deviceName == "Coty's Chromecast") {
            
          if(deviceName == "Coty's Newest Chromecast") {
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
    self.mediaControlChannel.play()
  }
  func pause() {
    self.mediaControlChannel.pause()
  }
  func disconnect() {
    self.deviceManager?.disconnect()
  }
  public func deviceDidComeOnline(_ device: GCKDevice) {
    print("\n device \(device.friendlyName!) did come online \(device) \n")
    

    
    cotysEventEmitterInstance.eventEmitterInstance.sendEvent()
    
    
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
    
  }
  
  func emitEvent(eventName: String, body: Any) {
    self.sendEvent(withName: eventName, body: body)
  }
}
