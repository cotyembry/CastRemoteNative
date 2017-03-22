//
//  DeviceManager.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//TODO: get the deviceManager delegation working correctly

//for delegation I need a protocol
//here I will define the responisbilities for the delegate



 protocol DeviceManagerDelegate: GCKDeviceManagerDelegate {
  func deviceManagerDidConnect(deviceManager: GCKDeviceManager)
}

/*

protocol DeviceScannerListener: class {
  func deviceDidComeOnline(device: GCKDevice)
  func deviceDidGoOffline(device: GCKDevice)
}
*/

/*
@objc(DeviceManager)
public class DeviceManager: NSObject, GCKDeviceManagerDelegate {
  
}
*/



@objc(DeviceManager)
public class DeviceManager: NSObject, DeviceManagerDelegate, GCKDeviceScannerListener {
//public class DeviceManager: NSObject, DeviceManagerDelegateTest, DeviceScannerListener {

  var deviceManager: GCKDeviceManager?
  var deviceScanner: GCKDeviceScanner?
  
  var deviceManagerDelegate: GCKDeviceManager? //add it as an optional since the delegate is not always set
  var deviceScannerListener: GCKDeviceScannerListener?
  
  var nilValueHelper: String?

  var devicesDictionary = [String: GCKDevice?]()
  
  /*
  override init() {
    DispatchQueue.main.async {
      let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
      // Initialize device scanner, then add the listener
      self.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
    
      print("in init, self.deviceScanner =: \(self.deviceScanner)")
    }
  }
  */
  
  
  // MARK: GCKDeviceManagerDelegate
  // this should be called after the device is connected to the application
  public func deviceManagerDidConnect(deviceManager: GCKDeviceManager) {
    print("\n\n\n in native code, device manager did connect! \n\n\n")
    
    //self.deviceManager?.joinApplication(<#T##applicationID: String##String#>, sessionID: <#T##String#>)
  }
  
  
  func connect(deviceManager: DeviceManager) {
    print("\n\n\n 2. in connect in DeviceManager.swift \n\n\n")
    
    // [START device-selection]
    //let identifier = NSBundle.mainBundle().bundleIdentifier
    let identifier =  Bundle.main.bundleIdentifier
    
    var i = 0
    
    var deviceExists = false
    
    var deviceToConnectTo: GCKDevice?
    if let deviceScanner = deviceManager.deviceScanner {
      deviceScanner.startScan()
      deviceScanner.passiveScan = false
      for device in deviceScanner.devices {
        var deviceName = (device as! GCKDevice).friendlyName
        
        if(deviceName == "Coty's Chromecast") {
          
          print("in if: about to connect: \(deviceName)\n")
          deviceToConnectTo = (device as! GCKDevice) //this should crash if the device is nil
          
          
          
          self.deviceManager = GCKDeviceManager(device: deviceToConnectTo!, clientPackageName: identifier!)
          
          
          self.deviceManagerDelegate?.delegate = self as GCKDeviceManagerDelegate
          
          self.deviceManager!.connect()
          
        }
        else {
          print("in else\n")
        }
      }

      
      //            deviceScanner.stopScan()
      deviceScanner.passiveScan = true
    }
    else {
      print("\n\n\nin else naw..\n\n\n")
        
    }
    
    /*
    self.deviceManagerDelegate = GCKDeviceManager(device: deviceToConnectTo!, clientPackageName: identifier!)
    
    self.deviceManagerDelegate?.delegate = self as! GCKDeviceManagerDelegate

    if(deviceExists == true) {
      self.deviceManagerDelegate!.connect()
    }
    else {
      print("\n\n\n CANNOT GET A HANDLE ON THE DEVICE...\n\n\n")
    }
    */
  }
  
  func startScanning(deviceManager: DeviceManager) -> Void {
    let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
    // Initialize device scanner, then add the listener
    self.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
    
    //var deviceToConnectTo: GCKDevice?
    
    if let deviceScanner = deviceManager.deviceScanner {
      print("adding deviceScanner Listener!\n")
      deviceScanner.add(self as! GCKDeviceScannerListener)
      
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
      print("naw...\n")
    }
    
    
    
    //deviceManager?.joinApplication(nilValueHelper)
  }
  
  func setUp() -> Void {
    // [START device-scanner]
    // Establish filter criteria and use the default receiver id: https://developers.google.com/cast/docs/receiver_apps and pass in the default receiver ID
    
    let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
    
    // Initialize device scanner, then add the listener
    
    self.deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
    
    if let deviceScanner = self.deviceScanner {
      deviceScanner.add(self as! GCKDeviceScannerListener)
      
      deviceScanner.startScan()
      deviceScanner.passiveScan = true
    }
    // [END device-scanner]
    
    print("\n\n\nstarted scanning\n\n\n")
    
  }
  
  public func deviceDidComeOnline(_ device: GCKDevice) {
    //updateButtonStates(); //use this later to change the google cast button color
    //deviceDidGoOffline = false
    
    print("\n\n\n 1: device \(device.friendlyName!) did come online \(device) \n\n\n")
    
    
    //this will allow me to store this value
    self.devicesDictionary[device.friendlyName!] = device
    
    //self.connectToDevice(deviceToConnectTo: device)
    
  }
  
  public func deviceDidGoOffline(_ device: GCKDevice) {
    //to remove it from the dictionary
    //self.devicesDictionary[device.friendlyName!] = nil  //this might work, but I'm not for sure

    self.devicesDictionary.removeValue(forKey: device.friendlyName!)
    
    
  }
  


  func joinSession() -> Void {
    print("\n\n\n");
        //print(GCKDeviceStatusUnknown);
    
    /*
     TODO: write code to set the myDevice variable up once the device has been connected
     
    let deviceStatus = myDevice?.status //myDevice was set just before calling connect()
    if(GCKDeviceStatus.busy == deviceStatus) {
      //i.e. if its connected to currently running media
      //try to join to it
    }
    print("\n\n\n");
    */
    
  }
  
}

  
