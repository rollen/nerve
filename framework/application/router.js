Router = function(routes, request, response, filesystem){
  this.routes = routes;
  this.request = request;
  this.response = response;
  this.filesystem = filesystem;
}

Router.prototype.route = function(path, method){
  this.findRouteFor(path, method, this.onFound, this.onNotFound);
}

Router.prototype.findRouteFor = function(path, method, onFound, onNotFound){
  for(var index = 0; index < this.routes.length; index++){
    route = this.routes[index];
    if(route.hasAMatchFor(path, method)) {
      return onFound(route, this.request, this.response, this.filesystem);
    }
  }
  onNotFound(path);
}

Router.prototype.hasRouteFor = function(path, method){
  var result = false;
  this.routes.forEach(function(route){
    if(!result && route.hasAMatchFor(path, method)){
      result = true;
    }
  });
  return result;
}

Router.prototype.onFound = function(route, request, response, filesystem){
  route.runAction(request, response, filesystem);
}

Router.prototype.onNotFound= function(path){
  throw "No valid route to " + path
}
