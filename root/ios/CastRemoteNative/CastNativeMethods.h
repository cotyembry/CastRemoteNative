//
//  CastNativeMethods.h
//  CastRemoteNative
//
//  Created by Coty Embry on 4/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef CastNativeMethods_h
#define CastNativeMethods_h

#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>


@interface CastNativeMethods: RCTEventEmitter <RCTBridgeModule>
-(void)regularFunction;
@end

#endif /* CastNativeMethods_h */
