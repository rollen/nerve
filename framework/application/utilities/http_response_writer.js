HttpFileResponseWriter= function(response, filesystem, folderpath, filename){
  var object = {};

  var path = function(){
    return [folderpath, filename].join('/')
  }

  var mimetype = function(){
    var filetype = filename.split('.')[1];
    types = { 'js':'application/x-javascript', 'html':'text/html', 'css':'text/css' }
    return types[filetype];
  }

  var encoding = function(){
    return 'utf8'
  }

  var writeToResponse= function(){
    filesystem.readFile(path(), "utf8", function onFileRead(error, data){
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
      } else {
        response.writeHead(200, {"Content-Type": mimetype()});
        response.write(data);
      } 
      response.end();
    })
  }

  // public functions
  object.mimetype = mimetype;
  object.writeToResponse = writeToResponse;
  object.encoding = encoding;

  return object;
}
