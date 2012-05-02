HttpRoute = function(controllerFactory, action, matcher) {
  var object = {};

  var runAction = function(request, response, filesystem){
    return (controllerFactory.build(request, response, filesystem))[action];
  }

  var hasAMatchFor = function(path, method) {
    return matcher.hasAMatchFor(path, method)
  }

  object.runAction = runAction;
  object.hasAMatchFor = hasAMatchFor;

  return object;
}
