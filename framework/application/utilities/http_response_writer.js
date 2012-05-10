HttpFileResponseWriter= function(response, filesystem, folderpath, filename){
  var object = {};

  var path = function(){
    return [folderpath, filename].join('/')
  }

  function filetype(){
    return filename.split('.')[1];
  }

  function isWebFile(){
    var cacheFileType = filetype();
    var validTypes = {'js': true, 'css': true, 'html':true};
    return validTypes[cacheFileType];
  }
  var mimetype = function(){
    var types = { 'js':'application/x-javascript', 
      'html':'text/html', 
      'png':'image/png', 
      'css':'text/css' 
    }
    return types[filetype()];
  }

  var encoding = function(){
    return isWebFile() ? 'utf8' : 'binary';
  }

  var writeToResponse= function(){
    filesystem.readFile(path(), encoding(), object.onFileRead);
  }

  var onFileRead = function(error, data){
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": mimetype()});
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
