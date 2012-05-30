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
    _injector.factory(nervex.Application.Router);
    _injector.factory(nervex.Application.Folderpath);
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
    return _injector;
  }

  function bootstrapFramework(){
    object.loadfiles();
    object.configure();
    object.patches();
  }
  
  function bootstrapApp(app){
    if(app){
      object.loadApplicationControllers(app.Controllers);
      object.loadApplicationConfiguration(app.Configurables);
    }
  }

  object.bootstrap = function(app){
    bootstrapFramework();
    bootstrapApp(app);
    return _injector;
  }

  object.loadApplicationControllers = function(controllers){
    for(key in controllers){
      _injector.service(controllers[key]);
    }
  }

  object.loadApplicationConfiguration = function(configs){
    for(key in configs){
      _injector.config(configs[key]);
    }
  }

  object.patches = function(){
    _injector.patch('params', nervex.Patches.Params);
  }

  object.configure = function(){
    _injector.config(nervex.Config.Router);
    _injector.config(nervex.Config.Folderpath);

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


