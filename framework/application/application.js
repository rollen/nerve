Application = function(routers, errorsController, urlPath, httpVerb){
  var object = {};

  object.executeRequest = function(params){
    var action = object.findAction();
    action(params);
  }


  object.findAction = function(){
    var router = object.findRouter()
    var action;
    if(router === null || router === false){
      action = errorsController.index;
    } else {
      action = router.route(urlPath, httpVerb);
    }
    return action;
  }

  object.findRouter = function(){
    var result = false;
    for(var i = 0; i < routers.length; i++){
      router = routers[i];
      if( !result && router.hasRouteFor(urlPath, httpVerb) ){
        result = router; 
        break;
      }
    }
    return result;
  }

  return object;
}

