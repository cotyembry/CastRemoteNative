/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>




/*
 Add #import "MyFirstProjectOnSwift-Swift.h" in "MyObjectiveCLass.m"
 Add @class mySwiftClass in MyObjectiveCLass.h;
 Then in MyObjectiveCLass.m
 
 mySwiftClass *myClass = [mySwiftClass new]; {Call Like This in any method wherever you want to call swift method.}
 [myClass methodName];
 
 */


//GlobalSwiftInstance *cotysTest;

RCTBridge *hopefullyTheBridge;

@implementation MyTest

-(RCTBridge*)getBridge {
  NSLog(@"hopefullyTheBridge = @%@", hopefullyTheBridge);
  return hopefullyTheBridge;
}

@end

//#import "GlobalSwiftInstance.h"

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *jsCodeLocation;

//NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"]; //load from file rather than from anywhere else

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  
  
  //[GlobalSwiftInstance ];
  /*
  RCTRootView *rootView = [[RCTRootView alloc]
                           initWithBridge:bridge
                           moduleName:kModuleName
                           initialProperties:nil];
  
  */
  
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"CastRemoteNative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  
  //mySwiftClass *myClass = [mySwiftClass new]; {Call Like This in any method wherever you want to call swift method.}
  //[myClass methodName];
  

  hopefullyTheBridge = rootView.bridge; //set the bridge to  be exposed and returned later and used by the swift class

  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
