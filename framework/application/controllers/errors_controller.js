ErrorsController = function(request, response){
  errors_controller = {}
  errors_controller.index = function(){
    response.writeHead(404, {"Content-Type":"text/html"});
    response.end();
  }
  return errors_controller;
}

