//I will use a self invoking function to expose the variable to allow me to write some custom code
// export default (function() {


// 	return store;
// })()



var store = {
	data: {},
	registeredKeys: [], //startAnimation, dismissModal
	register: function(name, data) {
		if(store.data.hasOwnProperty(name) === true) {
			console.error('Error: ', name, ' has already been registered so this register call will be ignored. To fix this, just change the value of the `name` parameter when calling store.register(changeThisOne,...)')
		}
		else {
			//otherwise set the passed in data to the passed in key
			store.data[name] = data;
		}
	}
}

module.exports = store;
