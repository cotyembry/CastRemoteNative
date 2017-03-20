//
//  CastNativeMethods.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/19/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "CastNativeMethods.h"

#import <React/RCTBridgeModule.h>

#import <React/RCTLog.h>


//TODO: implement the following methods
@implementation CastNativeMethods

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(log:(NSString *)message) {
  RCTLogInfo(@"%@", message);
}

-(void)getDeviceStatus {
  //you are going to have to return the value in the form of an event or promise or something
  //return deviceStatus
}

-(void)connectToCurrentSession {
  if(/*GCKDeviceStatus.Busy == deviceStatus*/true) {
    //if the device is currently busy (meaning an application is connected and running)
    //attempt to connect to the chromecast
    
    //deviceManager.joinApplication(joinApplicationMethodHelper)
    //note: to initialize deviceManager do:
    //var deviceManager: GCKDeviceManager? (in swift lol)
  }
}

-(void)didConnectToCurrentSession {
  //this will let me know on the javascript side that I finally connected to the stream/media session
}

@end
