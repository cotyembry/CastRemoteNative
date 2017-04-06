/*
#import "CastNativeMethods.h"

#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeModule.h>

@implementation CastNativeMethods


RCT_EXPORT_MODULE();

NSString * _bridge = @"";

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (void)didReceiveNewContentSizeMultiplier
{
  // Report the event across the bridge.
  [_bridge.eventDispatcher sendDeviceEventWithName:@"didUpdateContentSizeMultiplier"
                                              body:@([_bridge.accessibilityManager multiplier])];

@end
*/
