HttpRoute = function HttpRoute(controller, action, matcher) {
  var object = {};

  object.match = function(path, method){
    if(matcher.hasAMatchFor(path, method)){
      return { controller:controller,
        action:action};
    }else{
      return false;
    }
  }
  return object;
}
