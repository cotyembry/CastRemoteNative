#import "RCTBridgeModule.h"
#import <GoogleCast/GoogleCast.h>

@interface CastNativeMethods : NSObject <RCTBridgeModule, GCKDeviceScannerListener, GCKDeviceManagerDelegate,GCKMediaControlChannelDelegate>

@property GCKMediaControlChannel *mediaControlChannel;
@property(nonatomic, strong) GCKApplicationMetadata *applicationMetadata;
@property(nonatomic, strong) GCKDevice *selectedDevice;
@property(nonatomic, strong) GCKDeviceScanner* deviceScanner;
@property(nonatomic, strong) GCKDeviceManager* deviceManager;
@property(nonatomic, strong) GCKMediaInformation* mediaInformation;
@property(nonatomic, strong) NSMutableDictionary *currentDevices;

/* start coty's custom code */

/* end coty's current code */

@end
