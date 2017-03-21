//
//  DeviceManager.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//TODO: get the deviceManager delegation working correctly

@objc(DeviceManager)
public class DeviceManager: NSObject, GCKDeviceManagerDelegate, GCKDeviceScannerListener {
  var deviceManager: GCKDeviceManager?
  var deviceScanner: GCKDeviceScanner?
  
  var nilValueHelper: String?
  //var joinApplicationMethodHelper: String?
  
  
  var devicesDictionary = [String: GCKDevice?]()
  
  
  var isOkayToConnect = false
  
  
  func connectToDevice(deviceToConnectTo: GCKDevice) {
    
    // [START device-selection]
    //let identifier = NSBundle.mainBundle().bundleIdentifier
    let identifier =  Bundle.main.bundleIdentifier
    
    self.deviceManager = GCKDeviceManager(device: deviceToConnectTo, clientPackageName: identifier!)
    
    self.deviceManager!.delegate = self

    self.deviceManager!.connect()
    
  }
  
  
  
  
  @objc(setUp)
  func setUp() -> Void {
    // [START device-scanner]
    // Establish filter criteria and use the default receiver id: https://developers.google.com/cast/docs/receiver_apps and pass in the default receiver ID
    
    let filterCriteria = GCKFilterCriteria(forAvailableApplicationWithID: kGCKMediaDefaultReceiverApplicationID)
    
    // Initialize device scanner, then add the listener
    
    deviceScanner = GCKDeviceScanner(filterCriteria: filterCriteria)
    
    if let deviceScanner = deviceScanner {
      deviceScanner.add(self as GCKDeviceScannerListener)
      deviceScanner.startScan()
      deviceScanner.passiveScan = true
    }
    // [END device-scanner]
    
    print("\n\n\nstarted scanning\n\n\n")
    
  }
  
  public func deviceDidComeOnline(_ device: GCKDevice) {
    //updateButtonStates(); //use this later to change the google cast button color
    //deviceDidGoOffline = false
    
    print("\n\n\n 1: device \(device.friendlyName!) did come online\n\n\n")
    
    self.isOkayToConnect = true
    
    //this will allow me to store this value
    self.devicesDictionary[device.friendlyName!] = device
    
  }
  
  public func deviceDidGoOffline(_ device: GCKDevice) {
    //to remove it from the dictionary
    //self.devicesDictionary[device.friendlyName!] = nil  //this might work, but I'm not for sure
    
    self.isOkayToConnect = false
    self.devicesDictionary.removeValue(forKey: device.friendlyName!)
  }
  
  @objc(connect)
  func connect() -> Void {
    print("\n\n\n 2. in connect \n\n\n")
    if(self.isOkayToConnect == true) {
      print("\n it was true: connecting \n")
      var keys = Array(self.devicesDictionary.keys)
      let device = self.devicesDictionary[keys[0]]!
      
      self.connectToDevice(deviceToConnectTo: device!)
    }
    
    
    
    //deviceManager?.joinApplication(nilValueHelper)
  }
  

  //GCKDeviceManagerDelegate
  public func deviceManagerDidConnect(_ deviceManager: GCKDeviceManager) {
    print("\n\n\n 3. Device did connect \n\n\n")
  }
  
  @objc(joinSession)
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
  
  // MARK: GCKDeviceManagerDelegate
  // this should be called after the device is connected to the application
  public func deviceManagerDidConnect(deviceManager: GCKDeviceManager!) {
    print("deviceManagerDidConnect!!!")
    
  }
}





/* below is some code I can look at for reference
 
 
 if let deviceScanner = castInstance!.deviceScanner {
 deviceScanner.startScan()
 deviceScanner.passiveScan = false
 for device in deviceScanner.devices  {
 let buttonToAdd = UIAlertAction(title: device.friendlyName, style: .Default, handler: { (buttonSelected: UIAlertAction) -> Void in
 //now to find the correct device to connect to because this UIAlertAction parameter doesnt give me a way to pass the device itself in as a parameter... at least I couldn't figure out how to do it
 let deviceToConnectTo = self.castButtonHelper(buttonSelected) //I did this bc I couldnt figure out how to properly use the scope of a closure in Swift
 castInstance!.deviceManager?.disconnect()
 self.connectToDevice(deviceToConnectTo)
 })
 
 
 
 ...
 
 if let deviceScanner = castInstance!.deviceScanner {
 deviceScanner.startScan()
 deviceScanner.passiveScan = false
 for device in deviceScanner.devices  {
 let buttonToAdd = UIAlertAction(title: device.friendlyName, style: .Default, handler: { (buttonSelected: UIAlertAction) -> Void in
 //now to find the correct device to connect to because this UIAlertAction parameter doesnt give me a way to pass the device itself in as a parameter... at least I couldn't figure out how to do it
 let deviceToConnectTo = self.castButtonHelper(buttonSelected) //I did this bc I couldnt figure out how to properly use the scope of a closure in Swift
 castInstance!.deviceManager?.disconnect()
 self.connectToDevice(deviceToConnectTo)
 })
 
 
 
 */
  
