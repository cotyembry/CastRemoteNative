//
//  DeviceManager.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>

/*
 @interface RCT_EXTERN_MODULE(MySwiftThingy, NSObject)
 
 RCT_EXTERN_METHOD(callbackMethod:(RCTResponseSenderBlock)callback)
 RCT_EXTERN_METHOD(simpleMethod:(NSString *)message)
 
 @end
 
 */

@interface DeviceManager: NSObject //RCTEventEmitter <RCTBridgeModule>
//RCT_EXPORT_MODULE()

-(DeviceManager *)CreateDeviceManager;

@end
