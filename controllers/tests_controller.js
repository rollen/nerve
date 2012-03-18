TestsController = function(request, response, filesystem, pathToView){
  this.request = request;
  this.response = response;
  this.filesystem = filesystem;
  this.pathToView = pathToView;
}

TestsController.prototype.index = function(){
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
  })(this.response, this.filesystem, this.pathToView);
}

