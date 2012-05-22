var nervex = require('./framework/index.js');

function Nervex(request, response, filesystem){
  var object = {};
  _injector = nervex.Injector();

  object.loadfiles = function(){
    _injector.service(nervex.Application.Application);
    _injector.service(nervex.Application.RegexRouteMatcher);
    _injector.service(nervex.Application.StandardRouteMatcher);
    _injector.service(nervex.Application.HttpRoute);
    _injector.service(nervex.Application.AssetsController);
    _injector.service(nervex.Application.ErrorsController);
    _injector.service(nervex.Application.TestsController);
    _injector.service(nervex.Application.HttpFileResponseWriter);
    _injector.service(nervex.Application.FileInfo);
    _injector.service(nervex.Server.PostData);
    _injector.service(nervex.Application.AssetUrlInfo);
    _injector.factory(nervex.Application.Router);
    _injector.factory(nervex.Application.Path);
    _injector.service(nervex.Server.Server);
    _injector.constant('request', nervex.Server.Request);
    _injector.constant('response', nervex.Server.Response);
    _injector.constant('filesystem', require('fs'));
    _injector.constant('injector', _injector);
    return _injector;
  }
  object.bootstrap = function(){
    object.loadfiles();
    object.configure();
    return _injector;
  }

  object.configure = function(){
    _injector.config(nervex.Config.Router);
    _injector.config(nervex.Config.Path);

    if(request) _injector.constant('request', request);
    if(response) _injector.constant('response', response);
    if(filesystem) _injector.constant('filesystem', filesystem);
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


