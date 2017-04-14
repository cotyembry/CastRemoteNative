//
//  RNFLAnimatedImage.m
//  react_native_flanimatedimage
//
//  Created by Jason Brown on 11/23/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
//#import "FLAnimatedImage/FLAnimatedImage.h"

#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
//#import "UIView+React.h"
//#import "RCTLog.h"

#import "CastNativeMethods.h"



@implementation CastNativeMethods

  RCTEventDispatcher *_eventDispatcher;
  
  //FLAnimatedImage *_image;
  //FLAnimatedImageView *_imageView;
  
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"test"];
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super init])) {
    //self._eventDispatcher = eventDispatcher;
    
    
    _eventDispatcher = eventDispatcher;
    //_imageView = [[FLAnimatedImageView alloc] init];
    
    //[_imageView addObserver:self forKeyPath:@"currentFrameIndex" options:0 context:nil];
  }
  
  return self;
}

-(void)sendEvent {
  
  NSLog(@"in sendEvent in CastNativeMethods.m\n\n\n");
  

  [_eventDispatcher sendAppEventWithName:@"test" body:@"bodyTest"];
}

/*
-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSString *,id> *)change context:(void *)context {
  if (object == _imageView) {
    if ([keyPath isEqualToString:@"currentFrameIndex"]) {
      [_eventDispatcher sendInputEventWithName:@"onFrameChange" body:@{
                                                                       @"currentFrameIndex":[NSNumber numberWithUnsignedInteger:[object currentFrameIndex]],
                                                                       @"frameCount": [NSNumber numberWithUnsignedInteger:[_image frameCount]],
                                                                       @"target": self.reactTag
                                                                       }];
    }
  }
}
*/
@end
