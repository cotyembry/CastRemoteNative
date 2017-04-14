
#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import "CotysEventEmitter.h"
#import "CastNativeMethods.h"


@implementation CotysEventEmitter

RCT_EXPORT_MODULE();


//- (void)sendEventWithName:(NSString *)eventName body:(id)body

  

-(void)emitTheStupidEvent:(RCTBridge*)withBridge eventName:(NSString*)eventName andBody:(id)body {
  [withBridge enqueueJSCall:@"RCTDeviceEventEmitter"
                  method:@"emit"
                    args:body ? @[eventName, body] : @[eventName]
              completion:NULL];
}



/*

 Want:
  to be able to create an instance of CotysEventEmitter that:
    -holds a reference to an instance that has a reference to an event dispatcher capable of sending an event to javascript
 
 
 1. call CotysEventEmitter constructor
 2. call initEmitter on the CotysEventEmitter
 3. use the eventEmitterInstance
 
*/


-(id)init {
  self = [super init];
  if (self) {
    //define custom makeup here 
    
    
    NSLog(@"Creating eventEmitterInstance\n\n\n");
  
    self.eventEmitterInstance = [[CastNativeMethods alloc] initWithEventDispatcher: self.bridge.eventDispatcher];
     
    
  }
  return self;
}

-(void)initEmitter {
  NSLog(@"Creating eventEmitterInstance\n\n\n");
  
  self.eventEmitterInstance = [[CastNativeMethods alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
  
  [self.eventEmitterInstance sendEvent];
  
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(src, NSString);
RCT_EXPORT_VIEW_PROPERTY(contentMode, NSNumber);


@end


/*



//
//  CotysEventEmitter.m
//  CastRemoteNative
//
//  Created by Coty Embry on 4/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "CotysEventEmitter.h"



@implementation CotysEventEmitter

RCT_EXPORT_MODULE();

//@synthesize bridge = _bridge;


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"test"];
}


//-(void)callbackHelper:(RCTResponseSenderBlock *)callback {
-(void)callback:(RCTResponseSenderBlock) _callback {
  NSLog(@"in callbackHelper within CotysEventEmitter.\n\n\n");
  
  NSArray *myArray = @[@"1", @"2", @"3", @"4", @"5"];
  NSArray *events = [NSArray arrayWithObjects: @"Listen", @"Bro", @"Callbacks", @"andKickBacks", nil];
  
  _callback(@[@-1, events]);

  //[self sendEventWithName:@"test" body:@"testInCallbackHelper within CotysEventEmitter.m"];
  
  //[_bridge.eventDispatcher sendAppEventWithName:@"test" body:@"bodyTest"];
  
  //[self.bridge.eventDispatcher sendAppEventWithName:@"test" body:[@"in body.."]];

  //DeviceManager *instance = [DeviceManager create];
  
  
  
  
  
}



@end



*/
