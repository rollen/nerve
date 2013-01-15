function AppConfig(){
	var object = {};
	var context = {};

	object.set = function(key, value){
		context[key] = value;
	}

	object.get = function(key){
		return context[key]
	}

	object.$get = function(){
		return function(key){
			return context[key];
		}
	}
	return object;
}

module.exports = AppConfig;
