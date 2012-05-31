var StandardRouteMatcher = require('./../utilities/matchers/standard_route_matcher');
var RegexRouteMatcher = require('./../utilities/matchers/regex_route_matcher');
var HttpRoute = require('./../utilities/http_route');

function Router(){
  var o = {}
  var routes = [];
  var defaultControllerInfo = {controller:'ErrorsController',action:'index'};


  o.currentroutes = function(){
    return routes;
  }

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

  o.assets = function(regex, controller, action){
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

    object.template = function(path, method){
      var template;
      for(var i = 0; i < routes.length; i++){
        controllerInfo = routes[i].match(path, method);
        if(controllerInfo) {
          template = routes[i].template(); 
          break;
        }
      }
      return template;
    }

    return object;
  }

  return o;
}

module.exports = Router;

