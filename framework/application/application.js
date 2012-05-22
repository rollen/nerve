function Application(request, response, router, injectorService){
  var object = {};

  object.executeRequest = function(){
    var controllerinfo = router.route(request.url, request.method); 
    injectorService.instantiate(controllerinfo.controller)[controllerinfo.action]();
  }

  return object;
}

module.exports = Application;
