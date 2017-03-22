//
//  NativeMethods.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeMethods, NSObject)

RCT_EXTERN_METHOD(connect)
RCT_EXTERN_METHOD(startScanning)
RCT_EXTERN_METHOD(startScan)

@end
