HttpRoute = function(controllerFactory, action, matcher) {
  var object = {};
  
  runAction = function(request, response, filesystem){
    return (controllerFactory.build(request, response, filesystem))[action];
  }

  hasAMatchFor = function(path, method) {
    return matcher.hasAMatchFor(path, method)
  }

  object.runAction = runAction;
  object.hasAMatchFor = hasAMatchFor;

  return object;
}
