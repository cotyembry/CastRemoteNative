//
//  NativeMethods.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//
//  ChromeCastWorkFiles.swift
//  CastRemote
//
//  Created by Coty Embry on 12/27/15.
//  Copyright © 2015 cotyembry. All rights reserved.
//


public var deviceManagerInstance = DeviceManager()  //DeviceManager.swift instance

@objc(NativeMethods)
class NativeMethods: NSObject, GCKDeviceScannerListener {

  var devices = [String:GCKDevice]()
  
  var deviceScanner: GCKDeviceScanner?
  var deviceListener: GCKDeviceScannerListener?
  
  @objc(startScan)
  
  func startScan() {
    print("start scan chromecast!");
    
      
    //self.devices = [String:GCKDevice]()

    // Initialize device scanner.
    DispatchQueue.main.async {
      print("\n in DispatchQueue.main.async \n")
      let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
      // Initialize device scanner, then add the listener
      
      
      //here I was playing with the idea of using an acutal instance or not...
      
      deviceManagerInstance.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
      //self.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
      
      //if let deviceScanner = deviceManagerInstance.deviceScanner {
      if let deviceScanner = deviceManagerInstance.deviceScanner {
        print("adding scanner listener\n")
        deviceScanner.add(self as GCKDeviceScannerListener)
        deviceScanner.startScan()
        deviceScanner.passiveScan = false
        for device in deviceScanner.devices {
        
          print("in for loop \((device as! GCKDevice).friendlyName)")
          //deviceToConnectTo = (device as! GCKDevice) //this should crash if the device is nil
        
        }
        //deviceScanner.stopScan()
        deviceScanner.passiveScan = true
        
      }
      else {
        print("in else adding scanner...\n")
      }
  
    }
    
  }
  
  /*
  @objc(startScanning)
  func startScanning() -> Void {
    DispatchQueue.main.async {
      deviceManagerInstance.startScanning(deviceManager: deviceManagerInstance)
    }
    //DispatchQueue.main.asyncAfter(deadline: .now()) {
      //now that a deviceScanner has been created I could do something more here
    //}
  }
  */
  
  @objc(connect)
  func connect() {
    print("in CONNECT\n")
    
    DispatchQueue.main.async {
      var keys = Array(self.devices)
      for(key, device) in keys {
        if(self.devices[key]?.friendlyName == "Coty's Chromecast") {
          print("\n\n\n in CONNECT \n\n\n")
        }
      }
    }
  }
  
  func deviceDidComeOnline(_ device: GCKDevice) {
    self.devices[device.deviceID] = device
  }

  func deviceDidGoOffline(_ device: GCKDevice) {
    self.devices[device.deviceID] = nil
  }
  
  /*
  @ objc(connect)
  func connect() -> Void {
    DispatchQueue.main.async {
      deviceManagerInstance.connect(deviceManager: deviceManagerInstance)
    }
  }
  */

}



/*
 func sayHello() -> Void {
 print("in sayHello in NativeMethods.swift\n");
 //since some of this next logic must be done on the main thread, I will do that now
 DispatchQueue.main.async {
 //let delegateObj = UIApplication.sharedApplication().delegate as YourAppDelegateClass
 //delegateObj.addUIImage("yourstring")
 
 deviceManagerInstance.setUp()
 }
 
 //and then for when it is done with the above async method on the main thread
 DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
 print("\n\n\n in main.asyncAfter \n\n\n")
 }
 
 
 }
 */


/*
//create protocol to work with... you guessed it... updating the view
protocol UpdateView {
  func updateView()
  func updateDeviceConnectToView(deviceConnectedTo: GCKDevice)
  func updateStreamDuration()
}

public class NativeMethods: NSObject, GCKDeviceScannerListener, GCKDeviceManagerDelegate, GCKMediaControlChannelDelegate {
  
  
  
  
  //this is where I declare my protocol
  var delegate: UpdateView?
  var helper = false
  
  var deviceScanner: GCKDeviceScanner?
  var deviceManager: GCKDeviceManager?
  var selectedDevice: GCKDevice?
  var myDevice: GCKDevice?
  var mediaControlChannel = GCKMediaControlChannel()
  var joinApplicationMethodHelper: String?
  
  var joining = false //these next 3 variablesare going to be used as my workaround for not being able to get the stream duration easily
  var successfullyJoined = false
  var gotHere = false
  var deviceDidGoOffline = false
  
  //I'll use this to help see if it's okay to disconnect the chromecast session
  var isDisconnectOkayHelper = false
  var mediaIsPlaying = false
  

  @objc func sayHello() {
    print("In sayHello in NativeMethods.swift")
  }
  
  
  /*
  // [START launch-application]
  // MARK: GCKDeviceManagerDelegate
  // this should be called after the device is connected to the application
  public func deviceManagerDidConnect(deviceManager: GCKDeviceManager!) {
    print("Application connected to the ChromeCast.")
 
    self.deviceManager = deviceManager
    
    isDisconnectOkayHelper = true
    let deviceStatus = myDevice?.status //myDevice was set just before calling connect()
    if(GCKDeviceStatus.busy == deviceStatus) {
      joining = true //workaround for not being able to get the stream duration cleanly
      
      print("Joining current Media session")
    }
    
 
  }
  */
  
  
    
  /*
  // This gets called when an application has launched or joined successfully
  // [END_EXCLUDpublic E]
  public func deviceManager(deviceManager: GCKDeviceManager!, didConnectToCastApplication applicationMetadata: GCKApplicationMetadata!, sessionID: String!, launchedApplication: Bool) {
    print("Successfully joined the Media session on device \(deviceManager.device.friendlyName)")
  }
  */
 
//}*/
