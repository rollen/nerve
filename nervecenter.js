var nervex = require('./framework/index.js');

function bootstrap(){
  var injector = nervex.Injector();
  injector.service(nervex.Application.Application);
  injector.service(nervex.Application.RegexRouteMatcher);
  injector.service(nervex.Application.StandardRouteMatcher);
  injector.factory(nervex.Application.Router);
  injector.service(nervex.Application.HttpRoute);
  injector.service(nervex.Application.AssetsController);
  injector.service(nervex.Application.ErrorsController);
  injector.service(nervex.Application.HttpFileResponseWriter);
  injector.service(nervex.Server.PostData);
  injector.factory(nervex.Server.Request);
  injector.factory(nervex.Server.Response);
  injector.registerService('injector', injector);
  return injector;
}

exports.Injector = nervex.Injector;
exports.Application = nervex.Application;
exports.Server = nervex.Server;
exports.bootstrap = bootstrap;


