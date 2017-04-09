//
//  GlobalSwiftInstance.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 4/8/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

public var reactBridge: RCTBridge!


@objc(GlobalSwiftInstance)
public class GlobalSwiftInstance: NSObject {
  var bridgeWasSet = false
  
  @objc(test)
  func test() {
    print("in test!\n\n\n")
  }
  
  func create() -> GlobalSwiftInstance {

    return GlobalSwiftInstance()
  }
  
  func setBridge(withBridge: RCTBridge) {
    reactBridge = withBridge
    
    bridgeWasSet = true
  }
  func getBridge() -> Any {
    if(self.bridgeWasSet == true) {
      return reactBridge
    }
    else {
      print("the setBridge method has not been called, make sure to call it with the bridge instance so it can be stored and used (in GlobalSwiftInstance.swift")
      return -1
    }
  }
}
