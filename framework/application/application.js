function Application(request, response, router, injector){
  var object = {};

  object.executeRequest = function(postparams){
    var info= router.route(request.url, request.method); 
    injector.constant('postparams', postparams);
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
