#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CotysEventEmitter: RCTEventEmitter <RCTBridgeModule>
- (NSArray<NSString *> *)supportedEvents;
-(void)toJS;

@end
