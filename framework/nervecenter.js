var Application = require('./application')
, Server = require('./server')
, Config = require('./config')
, Patches = require('./patches')
, Auto = require('./auto')

function Nervex(request, response, fs){
	var object = {};
	_injector = Auto.Injector();

	function loadFrameworkFiles(){
		_injector.service(Application.Application);
		_injector.service(Application.Params);
		_injector.service(Application.Template);
		object.load(Server, _injector.service);
		object.load(Application.Utilities, _injector.service);
		object.load(Application.Controllers, _injector.service);
	}

	object.loadfiles = function(){
		loadFrameworkFiles();
		_injector.constant('request', Server.Request);
		_injector.constant('response', Server.Response);
		_injector.constant('fs', require('fs'));
		_injector.constant('path', require('path'));
		_injector.constant('console', console);
		_injector.constant('buffer', require('buffer'));
		_injector.constant('json', JSON);
		_injector.constant('q', require('q'));
		_injector.constant('injector', _injector);
		object.load(Application.Configurables, _injector.factory);
		return _injector;
	}

	function bootstrapFramework(){
		object.loadfiles();
		object.configure();
		object.patches();
	}

	function bootstrapApp(app){
		if(app){
			object.load(app.Controllers, _injector.service);
			object.load(app.Configuration, _injector.config);
		}
	}

	object.patches = function(){
		_injector.patch('params', Patches.Params);
		_injector.patch('pg', Patches.Pg);
	}

	object.bootstrap = function(app){
		bootstrapFramework();
		bootstrapApp(app);
		return _injector;
	}

	object.load = function(collection, callback){
		for(key in collection){
			callback(collection[key]);
		}
	}

	object.configure = function(){
		object.load(Config, _injector.config);
		if(request) _injector.constant('request', request);
		if(response) _injector.constant('response', response);
		if(fs) _injector.constant('fs', fs);
	}

	object.inject = function inject(func){
		return function(){_injector.invoke(func);};
	}

	object.injector= function(func){
		func(_injector);
	}
	object._injector = _injector;
	return object;
}

exports.nerve = Nervex;


