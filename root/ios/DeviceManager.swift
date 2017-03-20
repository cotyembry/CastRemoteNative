//
//  DeviceManager.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

@objc(DeviceManager)
public class DeviceManager: NSObject, GCKDeviceManagerDelegate {
  var deviceManager: GCKDeviceManager?
  
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
}
