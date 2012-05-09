Router = function(routes, request, response, filesystem){
  var object = {}

  object.route = function(path, method){
    return object.findRouteFor(path, method, object.onFound, object.onNotFound);
  }

  object.findRouteFor = function(path, method, onFound, onNotFound){
    for(var index = 0; index < routes.length; index++){
      route = routes[index];
      if(route.hasAMatchFor(path, method)) {
        return onFound(route, request, response, filesystem);
      }
    }
    onNotFound(path);
  }

  object.hasRouteFor = function(path, method){
    var result = false;
    routes.forEach(function(route, object){
      if(!result && route.hasAMatchFor(path, method)){
        result = true;
      }
    });
    return result;
  }

  object.onFound = function(route, request, response, filesystem){
    return route.makeAction(request, response, filesystem);
  }

  object.onNotFound= function(path){
    throw "No valid route to " + path
  }

  return object;
}
