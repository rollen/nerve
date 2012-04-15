Application = function(routers, errorsController, urlPath, httpVerb){
  this.routers = routers || [];
  this.errorsController = errorsController;
  this.urlPath= urlPath;
  this.httpVerb = httpVerb;
}

Application.prototype.executeRequest = function(){
  var router = this.findRouter()
  if(router === null || router === false){
    this.errorsController.index();
  } else {
    router.route(this.urlPath, this.httpVerb);
  }
}

Application.prototype.findRouter = function(){
  self = this;
  var result = false;

  this.routers.forEach(function(router){
    if( !result && router.hasRouteFor(self.urlPath, self.httpVerb) ){
      result = router; 
    }
  });
  return result;
}


