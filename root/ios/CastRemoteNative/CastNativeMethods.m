//
//  CastNativeMethods.m
//  CastRemoteNative
//
//  Created by Coty Embry on 3/19/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "CastNativeMethods.h"

@implementation CastNativeMethods

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location) {
  NSLog(@"\n\n\n in RCT_EXPORT_METHOD \n\n\n");
}


@end

