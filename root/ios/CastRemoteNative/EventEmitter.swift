//
//  EventEmitter.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 4/5/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//declare it public to be able to create an instance of it in another swift file
public class EventEmitter: RCTEventEmitter {
  override public func supportedEvents() -> [String]! {
    return ["test"]
  }
  
  func sendToJS() {
    //self.sendEvent( withName: "AddRatingManagerEvent", body: ["name": "saveRating", "message": rating, "extra": identifier),
  
    print("in sendToJS method")
    self.sendEvent(withName: "test", body:["dataOne"])
  
  }
  
}
