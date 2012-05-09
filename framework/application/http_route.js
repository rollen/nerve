HttpRoute = function(controllerFactory, action, matcher) {
  var object = {};

  var makeAction = function(request, response, filesystem){
    return (controllerFactory.build(request, response, filesystem))[action];
  }

  var hasAMatchFor = function(path, method) {
    return matcher.hasAMatchFor(path, method)
  }

  object.makeAction = makeAction;
  object.hasAMatchFor = hasAMatchFor;

  return object;
}
