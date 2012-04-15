TestsController = function(request, response, filesystem, pathToView){
  tests_controller = {}

  tests_controller.index = function(){
    (function(res, filesystem, path){
      filesystem.readFile(path, "utf8", function(error, data){
        if(error) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.write(error + "\n");
        } else {
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(data);
        } 
        res.end();
      })
    })(response, filesystem, pathToView);
  }
  return tests_controller;
}

