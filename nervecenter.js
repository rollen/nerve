var nervex = require('./framework/index.js');

function Nervex(request, response, fs){
  var object = {};
  _injector = nervex.Auto.Injector();

  function loadFrameworkFiles(){
    _injector.service(nervex.Application.Application);
    _injector.service(nervex.Application.RegexRouteMatcher);
    _injector.service(nervex.Application.StandardRouteMatcher);
    _injector.service(nervex.Application.HttpRoute);
    _injector.service(nervex.Application.AssetsController);
    _injector.service(nervex.Application.ErrorsController);
    _injector.service(nervex.Application.TestsController);
    _injector.service(nervex.Application.HttpFileResponseWriter);
    _injector.service(nervex.Application.HttpUrlParamsExtractor);
    _injector.service(nervex.Application.FileInfo);
    _injector.service(nervex.Server.PostData);
    _injector.service(nervex.Application.AssetUrlInfo);
    _injector.service(nervex.Server.Server);
  }

  object.loadfiles = function(){
    loadFrameworkFiles();
    _injector.constant('request', nervex.Server.Request);
    _injector.constant('response', nervex.Server.Response);
    _injector.constant('fs', require('fs'));
    _injector.constant('path', require('path'));
    _injector.constant('console', console);
    _injector.constant('buffer', require('buffer'));
    _injector.constant('json', JSON);
    _injector.constant('injector', _injector);
    _injector.service(nervex.Application.Params);
    object.load(nervex.Application.Configurables, _injector.factory);
    return _injector;
  }

  function bootstrapFramework(){
    object.loadfiles();
    object.configure();
    object.patches();
  }
  
  function bootstrapApp(app){
    if(app){
      object.load(app.Controllers, object.service);
      object.load(app.Configuration, object.config);
    }
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

  object.patches = function(){
    _injector.patch('params', nervex.Patches.Params);
  }

  object.configure = function(){
    object.load(nervex.Config, _injector.config);

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


