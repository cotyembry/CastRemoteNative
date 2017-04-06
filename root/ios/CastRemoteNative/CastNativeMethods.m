//
//  NGListener.m
//  event_listener
//
//  Created by Giang Le Ngoc on 9/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "CastNativeMethods.h"

@implementation CastNativeMethods

RCT_EXPORT_MODULE();

- (NSArray<NSString*> *)supportedEvents {
  return @[@"test", @"deviceList"];
}
/*
RCT_EXPORT_METHOD(showAlert:(NSString *)msg) {
  
  // We'll show UIAlerView to know listener successful.
  UIAlertView *alert = [[UIAlertView alloc]initWithTitle:nil message:msg delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
  dispatch_async(dispatch_get_main_queue(), ^{
    [alert show];
  });
  
  
}
*/

-(void)regularFunction {
  NSLog(@"in regularFunction\n\n\n");
  
  [self testEvent];
}

RCT_EXPORT_METHOD(testEvent) {
  //NativeMethods *instance = [NativeMethods new];
  //[instance myTest];
  
  
  [self sendEventWithName:@"test" body:@"in testEventinCastNativeMethods"];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
  
  if (buttonIndex == 0) {
    // Sent event tap on Cancel
    [self sendEventWithName:@"CancelEvent" body:@"Tap on Cancel button from Objc"];
    
  } else if (buttonIndex == 1) {
    // Sent event tap on Ok
    [self sendEventWithName:@"OKEvent" body:@"Tap on OK button from Objc"];
  }
}

@end
