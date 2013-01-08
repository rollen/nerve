function HttpFileResponseWriter(response, fs){
  var object = {};

  object.onFileRead = function(fileInfo, onFileReadComplete){
    return function(error, data){
      if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
				response.end();
      } else {
        response.writeHead(200, fileInfo.headers());
        response.write(data, fileInfo.encoding());
				onFileReadComplete(undefined, data);
      } 
    }
  }

  function writeToResponseAndEnd(fileInfo){
		function onFileReadComplete(error, data){
			response.end();
		}

    fs.readFile(fileInfo.path(), 
				fileInfo.encoding(), 
				object.onFileRead(fileInfo, onFileReadComplete));
  }

	function writeToResponse(fileInfo, onFileReadComplete){
    fs.readFile(fileInfo.path(), 
				fileInfo.encoding(), 
				object.onFileRead(fileInfo, onFileReadComplete));
	}

  // public functions
  object.writeToResponseAndEnd = writeToResponseAndEnd;
	object.writeToResponse = writeToResponse;

  return object;
}

module.exports = HttpFileResponseWriter;

