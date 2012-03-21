AssetsController = function(httpFileResponseWriter){
  this.httpFileResponseWriter= httpFileResponseWriter;
}

AssetsController.prototype.show = function(){
  this.httpFileResponseWriter.writeToResponse();
}

