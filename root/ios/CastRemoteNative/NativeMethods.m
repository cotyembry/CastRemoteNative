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



@interface RCT_EXTERN_MODULE(NativeMethods, NSObject)
//@property (nonatomic, weak) RCTBridge *bridge;


RCT_EXTERN_METHOD(scan)
RCT_EXTERN_METHOD(connect)
RCT_EXTERN_METHOD(seek: numberToSeekTo)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(play)
RCT_EXTERN_METHOD(pause)


RCT_EXTERN_METHOD(test)

RCT_EXPORT_METHOD(_getDevices: callback) {
  //NativeMethods *instance = [NativeMethods new];
  //[instance myTest];
  
  
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

RCT_EXTERN_METHOD(getDevices)

@end
