function Application(request, router, injector){
  var object = {};

  object.executeRequest = function(){
    var info= router.route(request.url, request.method); 
    injector.instantiate(info.controller,
                         object.onControllerCreated(info.action));
  }

  object.onControllerCreated = function(action){
    return function(controller){
      controller[action](); 
    }
  }

  return object;
}

module.exports = Application;
