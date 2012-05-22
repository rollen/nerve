var nervex = require('./framework/index.js');

function bootstrap(){
  var injector = nervex.Injector();
  injector.service(nervex.Application.Application);
  injector.service(nervex.Application.RegexRouteMatcher);
  injector.service(nervex.Application.StandardRouteMatcher);
  injector.service(nervex.Application.HttpRoute);
  injector.service(nervex.Application.AssetsController);
  injector.service(nervex.Application.ErrorsController);
  injector.service(nervex.Application.HttpFileResponseWriter);
  injector.service(nervex.Application.FileInfo);
  injector.service(nervex.Server.PostData);
  injector.service(nervex.Application.AssetUrlInfo);
  injector.factory(nervex.Application.Router);
  injector.factory(nervex.Application.Path);
  injector.constant('request', nervex.Server.Request);
  injector.constant('response', nervex.Server.Response);
  injector.constant('filesystem', require('fs'));
  injector.registerService('injector', injector);
  return injector;
}

exports.Injector = nervex.Injector;
exports.Application = nervex.Application;
exports.Server = nervex.Server;
exports.bootstrap = bootstrap;


