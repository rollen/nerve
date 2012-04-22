HttpRoute = function(controllerFactory, action, matcher) {
  var httpRoute = {};
  
  httpRoute.runAction = function(request, response, filesystem){
    return (controllerFactory.build(request, response, filesystem))[action];
  }

  httpRoute.toString = function(){
    return ['httpVerb: ' + matcher.httpVerb, 'template: ' + matcher.template].join('  ');
  }

  httpRoute.hasAMatchFor = function(path, method) {
    return matcher.hasAMatchFor(path, method)
  }

  return httpRoute;
}
