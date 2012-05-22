function Application(request, response, router, injector){
  var object = {};

  object.executeRequest = function(postparams){
    var controllerinfo = router.route(request.url, request.method); 
    injector.constant('postparams', postparams);
    var controller = injector.instantiate(controllerinfo.controller)
    controller[controllerinfo.action]();
  }

  return object;
}

module.exports = Application;
