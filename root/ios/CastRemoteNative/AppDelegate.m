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

#import "NativeMethods-Bridging-Header.h"

#import "GlobalSwiftInstance-Swift.h"

#import "CastRemoteNative-Swift.h"


/*
 Add #import "MyFirstProjectOnSwift-Swift.h" in "MyObjectiveCLass.m"
 Add @class mySwiftClass in MyObjectiveCLass.h;
 Then in MyObjectiveCLass.m
 
 mySwiftClass *myClass = [mySwiftClass new]; {Call Like This in any method wherever you want to call swift method.}
 [myClass methodName];
 
 */


//#import "GlobalSwiftInstance.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

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
  
  GlobalSwiftInstance *instance = [GlobalSwiftInstance new];
  [instance test];
  
  /*
  @objc class Cat {
    class func create() -> Cat {
      return Cat()
    }
  }
  func CreateCat() -> Cat {
    return Cat()
  }
  
  
  Cat *cat = [Cat create];
  Cat *cat = CreateCat();
  */
  
  //[NativeMethods ]
  
  //[GlobalSwiftInstance create];
  //[GlobalSwiftInstance test];
  
  //[GlobalSwiftInstance cre];
  
  //GlobalSwiftInstance *gsi = [GlobalSwiftInstance create];
  //[gsi setBridge: rootView.bridge];
  //now that gis has been set with the bridge I need to make it accessible to everyone else
  
  
  
  //[GlobalSwiftInstance setBridge: rootView.bridge]; //is this too good to be true? I hope not!!
  //[GlobalSwiftInstance ];
  
  //[GlobalSwiftInstance setBridge: rootView.bridge];
  
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
