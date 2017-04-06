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
//RCTEventDispatcher *_eventDispatcher;
//@property RCTEventDispatcher* _eventDispatcher;


-(instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher;
-(void)sendEvent;


-(NSArray<NSString *> *)supportedEvents;
@end

#endif /* CastNativeMethods_h */
