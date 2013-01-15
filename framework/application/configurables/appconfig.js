function AppConfig(){
	var object = {};
	var context = {};

	object.set = function(key, value){
		context[key] = value;
	}

	object.get = function(key){
		return context[key]
	}

	object.push = function(key, value){
		if(context[key] === undefined ){
			context[key] = [];	
		} 
		context[key].push(value);		
	}

	object.$get = function(){
		return function(key){
			return context[key];
		}
	}
	return object;
}

module.exports = AppConfig;
