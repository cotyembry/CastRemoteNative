TODO:
	Label.jsx
		convert pseudo code and comments into actual js

	SeekInput.jsx
		"	"	"


	-Add min widths to components to make the view still look presentable when the keyboard gets shown

	-add delay where after selecting 'seek', the numbers stay in there for a like 5 seconds, then they clear
		add a clear button that works for both text input boxes

	-//TODO: check to see if I need to optimize this .scan method in DeviceManager.swift to handle intelligently when it is called multiple times (i.e. keeping the code from recreating a class instance in its place, etc)

	-todo: cleanup CastIcon.js's logic on how it has to call the .getDevices method twice (maybe in the Native side do a DispatchQueue.main.async{} ... DispatchQueue.main.done - or whatever the method is named for swift that fires after the .async method finishes - I know there is one, I've used it before)

	-until I get the event system working, implement polling in the ChromecaseDevicesModal.js Component when the modal is open

	-make sure ChromecastDevicesModal.js is capable of handling, let's say, 100 devices available (i.e. how will the overflow be handled? Will it turn into a scrollview or what). This needs to be done

	