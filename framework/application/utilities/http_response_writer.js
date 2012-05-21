function HttpFileResponseWriter(response, filesystem){
  var object = {};

  var writeToResponse= function(folderpath, filename){
    function path(){
      return [folderpath, filename].join('/')
    }
    filesystem.readFile(path(), encoding(), object.onFileRead);
  }

  var onFileRead = function(error, data){
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, headers());
      response.end(data, encoding());
    } 
  }

  // public functions
  object.mimetype = mimetype;
  object.writeToResponse = writeToResponse;
  object.encoding = encoding;
  object.onFileRead = onFileRead;

  return object;
}

module.exports = HttpFileResponseWriter;

