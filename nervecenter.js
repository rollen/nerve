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
  injector.factory(nervex.Application.Router);

  injector.constant('request', nervex.Server.Request);
  injector.constant('reqponse', nervex.Server.Response);
  injector.registerService('injector', injector);
  return injector;
}

exports.Injector = nervex.Injector;
exports.Application = nervex.Application;
exports.Server = nervex.Server;
exports.bootstrap = bootstrap;


