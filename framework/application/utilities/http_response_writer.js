function HttpFileResponseWriter(response, fs){
  var object = {};

  object.onFileRead = function(fileInfo){
    return function(error, data){
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, fileInfo.headers());
        response.end(data, fileInfo.encoding());
      } 
    }
  }

  function writeToResponseAndEnd(fileInfo){
    fs.readFile(fileInfo.path(), fileInfo.encoding(), object.onFileRead(fileInfo));
  }

  // public functions
  object.writeToResponseAndEnd = writeToResponseAndEnd;

  return object;
}

module.exports = HttpFileResponseWriter;

