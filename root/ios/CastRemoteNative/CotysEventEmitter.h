#import <React/RCTViewManager.h>

#import "CastNativeMethods.h"

@interface CotysEventEmitter : RCTViewManager

@property CastNativeMethods *eventEmitterInstance;

-(void)initEmitter;

@end

/*
//
//  CotysEventEmitter.h
//  CastRemoteNative
//
//  Created by Coty Embry on 4/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef CotysEventEmitter_h
#define CotysEventEmitter_h

#import <React/RCTLog.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

#import <React/RCTEventEmitter.h>

typedef void(^MyCustomBlock)(void);

@interface CotysEventEmitter: RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, copy) void (^blockName)(NSArray *);
@property (nonatomic, copy) void (^completionHandler)();

-(NSArray<NSString *> *)supportedEvents;

//-(void)callbackHelper:(RCTResponseSenderBlock *)callback;
-(void)callback:(RCTResponseSenderBlock)callback;

@end
#endif /* CotysEventEmitter_h */
