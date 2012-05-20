Router = function Router(){
  var o = {}
  var routes = [];

  o.get = function(template, controller, action){
    o.template(template, controller, action, 'GET');
  }
  o.post= function(template, controller, action){
    o.template(template, controller, action, 'POST');
  }
  o.del= function(template, controller, action){
    o.template(template, controller, action, 'DELETE');
  }

  o.put= function(template, controller, action){
    o.template(template, controller, action, 'PUT');
  }

  o.template= function(template, controller, action, method){
    var matcher = StandardRouteMatcher(template, method);
    var template= HttpRoute(controller, action, matcher);
    routes.push(template);
  }

  o.$get = function Router(){
    var object = {};

    object.route = function(path, method){
      var controllerInfo;
      for(var i = 0; i < routes.length; i++){
        controllerInfo = routes[i].match(path, method);
        if(controllerInfo) break;
      }
      return controllerInfo;
    }

    return object;
  }

  return o;
}
