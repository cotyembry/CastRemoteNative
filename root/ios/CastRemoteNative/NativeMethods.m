//
//  NativeMethods.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>

#import "CotysEventEmitter.h"

#import "RCTBridgeModule.h"



@interface RCT_EXTERN_MODULE(NativeMethods, NSObject)
//@property (nonatomic, weak) RCTBridge *bridge;

RCT_EXTERN_METHOD(disconnect)
RCT_EXTERN_METHOD(getMediaDuration)
RCT_EXTERN_METHOD(pause)
RCT_EXTERN_METHOD(play)
RCT_EXTERN_METHOD(scan)
//RCT_EXTERN_METHOD(connect)  replaced with connectWidthDeviceId:
RCT_EXTERN_METHOD(seek: numberToSeekTo)
RCT_EXTERN_METHOD(stop)


RCT_EXTERN_METHOD(test)

RCT_EXTERN_METHOD(getDevices)

RCT_EXTERN_METHOD(connectWithDeviceId: deviceId)


RCT_EXPORT_METHOD(_getDevices: callback) {
  //NativeMethods *instance = [NativeMethods new];
  //[instance myTest];
  CotysEventEmitter *instance = [CotysEventEmitter new];
  
  
  NSLog(@"in _getDevices .m \n\n\n");
  
  //instance._completionBlock = callback;
  
  NSArray *myArray = @[@"1", @"2", @"3", @"4", @"5"];
  NSArray *events = [NSArray arrayWithObjects: @"Listen", @"Bro", @"Callbacks", @"andKickBacks", nil];
  
  
  //[instance callback: callback];
  //instance._completionBlock(@[@-1, events]);
}

 
/*
RCT_EXPORT_METHOD(_getDevices:callback) {
  
  NSLog(@"\n\n\nin .m\n\n\n");
  
  
  //NSArray *events = [];
 
  NSArray *myArray = @[@"1", @"2", @"3", @"4", @"5"];
  NSArray *events = [NSArray arrayWithObjects: @"Listen", @"Bro", @"Callbacks", @"andKickBacks", nil];
  
  callback(@[[NSNull null], events]);
  
}
*/

@end
