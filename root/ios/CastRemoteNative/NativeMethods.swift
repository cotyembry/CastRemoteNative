//
//  NativeMethods.swift
//  CastRemoteNative
//
//  Created by Coty Embry on 3/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

//  I didn't want to remove the below comment because that is when I first wrote this iOS program without react-native. It was pretty bad lol, but it worked so I used a bunch of the code from it and I like to keep the date of when I started it
//
//  ChromeCastWorkFiles.swift
//  CastRemote
//
//  Created by Coty Embry on 12/27/15.
//  Copyright © 2015 cotyembry. All rights reserved.
//

//

public var emitEvent = CotysEventEmitter()


public var deviceManagerInstance = DeviceManager()  //DeviceManager.swift instance

@objc(NativeMethods)
class NativeMethods: RCTEventEmitter {
  //var bridge: SwiftJavascriptBridge = SwiftJavascriptBridge.bridge()
  
  
  override func supportedEvents() -> [String]! {
    return ["UploadProgress"]
  }
  
  @objc(scan)
  func scan() {
    deviceManagerInstance.scan()
  }
  @objc(connect)
  func connect() {
    deviceManagerInstance.connect()
  }
  @objc(disconnect)
  func disconnect() {
    deviceManagerInstance.disconnect()
  }
  @objc(seek:)
  func seek(numberToSeekTo: String) {
    deviceManagerInstance.seek(numberToSeekTo: numberToSeekTo)
  }
  @objc(stop)
  func stop() {
    deviceManagerInstance.stop()
  }
  @objc(play)
  func play() {    
    
    self.sendEvent(withName: "UploadProgress", body: "bodyFromSwift")
    
    
    //emitEvent.toJS()
    
    //deviceManagerInstance.play()
  }
  @objc(pause)
  func pause() {
    deviceManagerInstance.pause()
  }
}



