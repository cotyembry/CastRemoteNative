#import "RCTBridgeModule.h"


@interface EventEmitter: NSObject <RCTBridgeModule>
@property(nonatomic, strong) RCTBridge *bridge;
-(void)emitMessageToRN: (NSString *)eventName:(NSDictionary *)params;
@end
