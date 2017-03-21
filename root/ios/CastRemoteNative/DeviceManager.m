//
//  DeviceManager.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


//you have to export the methods that you want, since the whole module doesn't get exported
@interface RCT_EXTERN_MODULE(DeviceManager, NSObject)

RCT_EXTERN_METHOD(connect)

RCT_EXTERN_METHOD(joinSession)

RCT_EXTERN_METHOD(sayHello)

@end
