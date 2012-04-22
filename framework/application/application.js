Application = function(routers, errorsController, urlPath, httpVerb){
  routers = routers || [];
  application = {};

  application.executeRequest = function(params){
    var action = application.findAction();
    action(params);
  }

  application.findAction = function(){
    var router = application.findRouter()
    var action;
    if(router === null || router === false){
      action = errorsController.index;
    } else {
      action = router.route(urlPath, httpVerb);
    }
    return action;
  }

  application.findRouter = function(){
    var result = false;
    for(var i = 0; i < routers.length; i++){
      router = routers[i];
      if( !result && router.hasRouteFor(urlPath, httpVerb) ){
        result = router; 
      }
    }
    return result;
  }
  return application;
}

