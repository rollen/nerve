function Application(requestService, responseSerivce, router, injectorService){
  var object = {};

  object.executeRequest = function(){
    var controllerinfo = router.route(requestService.url, requestService.method); 
    injectorService.instantiate(controllerinfo.controller)[controllerinfo.action]();
  }

  return object;
}

module.exports = Application;
