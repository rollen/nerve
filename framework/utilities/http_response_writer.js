HttpFileResponseWriter= function(response, filesystem, folderpath, filename){
  this.response = response;
  this.filesystem = filesystem;
  this.folderpath = folderpath;
  this.filename = filename;
}

HttpFileResponseWriter.prototype.writeToResponse= function(){
  (function(res, filesystem, path){
    filesystem.readFile(path, "utf8", function onFileRead(error, data){
      if(error) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(error + "\n");
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
      } 
      res.end();
    })
  })(this.response, this.filesystem, [this.folderpath,  this.filename].join('/'));
}
