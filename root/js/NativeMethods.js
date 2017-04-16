/*
TODO

var NativeMethods = {
	data: {},
	registeredKeys: [], //startAnimation, dismissModal
	register: function(name, data) {
		if(NativeMethods.data.hasOwnProperty(name) === true) {
			console.error('Error: ', name, ' has already been registered so this register call will be ignored. To fix this, just change the value of the `name` parameter when calling NativeMethods.register(changeThisOne,...)')
		}
		else {
			//otherwise set the passed in data to the passed in key
			NativeMethods.data[name] = data;
		}
	}
}

module.exports = NativeMethods;
*/