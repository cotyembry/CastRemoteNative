//
//  CastRemoteNativeUITests.swift
//  CastRemoteNativeUITests
//
//  Created by Coty Embry on 5/5/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import XCTest

class CastRemoteNativeUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        // Use recording to get started writing UI tests.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
      
      let app = XCUIApplication()
      app.otherElements.matching(identifier: "  ").otherElements[" "].children(matching: .other).element.tap()
      
      snapshot("01ChromecastModule")
      
      app.otherElements["  Done Select the device you want to connect to below:   Coty's Chromecast "].otherElements[" Done"].tap()
      app.otherElements["  CastRemote Native     Disconnect  Minutes  : Seconds   Seek                  "].textFields["Minutes"].tap()
      app.keys["3"].tap()
      app.otherElements["  CastRemote Native     Disconnect   : Seconds   Seek                  "].textFields["Minutes"].typeText("3")
      app.otherElements["  CastRemote Native     Disconnect   : Seconds   Seek                  "].textFields["Seconds"].tap()
      app.keys["1"].tap()
      app.otherElements["  CastRemote Native     Disconnect  3  :   Seek                  "].textFields["Seconds"].typeText("16")
      app.otherElements["  CastRemote Native     Disconnect  3  : 16   Seek                  "].tap()
      

    }
    
}
