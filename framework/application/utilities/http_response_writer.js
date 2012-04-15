HttpFileResponseWriter= function(response, filesystem, folderpath, filename){
  this.response = response;
  this.filesystem = filesystem;
  this.folderpath = folderpath;
  this.filename = filename;
}

HttpFileResponseWriter.prototype.writeToResponse= function(){
  (function writeToRes(res, filesystem, path, mimetype){
    filesystem.readFile(path, "utf8", function onFileRead(error, data){
      if(error) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(error + "\n");
      } else {
        res.writeHead(200, {"Content-Type": mimetype});
        res.write(data);
      } 
      res.end();
    })
  })(this.response, this.filesystem, [this.folderpath,  this.filename].join('/'), this.mimetype());
}

HttpFileResponseWriter.prototype.mimetype = function(){
  var filetype = this.filename.split('.')[1];
  types = { 'js':'application/x-javascript', 'html':'text/html', 'css':'text/css' }
  return types[filetype];
}
