




/*
#import "EventEmitter.h"
#import <React/RCTBridge.h>

#import <React/RCTEventDispatcher.h>

@implementation EventEmitter
@synthesize bridge = _bridge;

//below is apparently an example of how to create a singleton in objective-c
+ (instancetype)sharedInstance {
  static EventEmitter *sharedInstance = nil;
  //static RCTBridge * bridge = nil;
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{
    sharedInstance = [[EventEmitter alloc] init];
  });
  return sharedInstance;
}
// below is an example of how to call emitMessageToRN
- (void)deviceDidComeOnline:(GCKDevice *)device {
  NSLog(@"device found!! %@", device.friendlyName);
  [self emitMessageToRN: @"DeviceAvailable"
                       :@{@"device_available": @YES}];

}


- (void) emitMessageToRN: (NSString *) eventName: (NSDictionary *)params {
  [self.bridge.eventDispatcher sendAppEventWithName: eventName body: params];
}
@end

*/
