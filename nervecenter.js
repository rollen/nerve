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
    _injector.factory(nervex.Application.Path);
    _injector.service(nervex.Server.Server);
  }

  object.loadfiles = function(){
    loadFrameworkFiles();
    _injector.constant('request', nervex.Server.Request);
    _injector.constant('response', nervex.Server.Response);
    _injector.constant('fs', require('fs'));
    _injector.constant('json', JSON);
    _injector.constant('injector', _injector);
    _injector.service(nervex.Application.Params);
    return _injector;
  }
  object.bootstrap = function(){
    object.loadfiles();
    object.configure();
    object.patches();
    return _injector;
  }


  object.patches = function(){
    _injector.patch('params', nervex.Patches.Params);
  }

  object.configure = function(){
    _injector.config(nervex.Config.Router);
    _injector.config(nervex.Config.Path);

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


