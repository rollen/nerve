ErrorsController = function(request, response){
  this.request = request;
  this.response = response;
}

ErrorsController.prototype.index = function(){
  this.response.writeHead(404, {"Content-Type":"text/html"});
  this.response.end();
}

