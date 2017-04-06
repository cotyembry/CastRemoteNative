#import "CotysEventEmitter.h"
#import <React/RCTLog.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>



@implementation CotysEventEmitter
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"test"];
}

- (void)toJS {
  NSLog(@"in toJS method of CotysEventEmitter");
  [self emitMessageToRN: @"test"
                       :@{@"test": @YES}];

}

- (void) emitMessageToRN: (NSString *)eventName :(NSDictionary *)params {
  
  NSLog(@"about to dispatch event");
  
  //[self.bridge.eventDispatcher sendAppEventWithName: eventName body: params];
  [self sendEventWithName:@"test" body:@"testBody"];
}


@end
