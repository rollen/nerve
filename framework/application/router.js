var StandardRouteMatcher = require('./utilities/matchers/standard_route_matcher');
var RegexRouteMatcher = require('./utilities/matchers/regex_route_matcher');
var HttpRoute = require('./http_route');

function Router(){
  var o = {}
  var routes = [];
  var defaultControllerInfo = {controller:'ErrorsController',action:'index'};

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

  o.static = function(template, controller, action){
    var matcher = RegexRouteMatcher(regex);
    var template= HttpRoute(controller, action, matcher);
    routes.push(template);
  }

  o.template= function(template, controller, action, method){
    var matcher = StandardRouteMatcher(template, method);
    var template= HttpRoute(controller, action, matcher);
    routes.push(template);
  }

  o.defaultController = function(params){
    defaultController = params;
  }

  o.$get = function Router(){
    var object = {};

    object.route = function(path, method){
      var controllerInfo;
      for(var i = 0; i < routes.length; i++){
        controllerInfo = routes[i].match(path, method);
        if(controllerInfo) break;
      }
      return controllerInfo ? controllerInfo : defaultControllerInfo;
    }

    return object;
  }

  return o;
}

module.exports = Router;
