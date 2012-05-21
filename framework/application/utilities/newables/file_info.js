function FileInfo(filepath, filename){
  var object = {};

  function filetype(){
    return filename.split('.')[1];
  }

  function isWebFile(){
    var cacheFileType = filetype();
    var validTypes = {'js': true, 'css': true, 'html':true};
    return validTypes[cacheFileType];
  }

  function mimetype(){
    var types = { 'js':'application/x-javascript', 
      'html':'text/html', 
      'png':'image/png', 
      'css':'text/css' 
    }
    return types[filetype()];
  }

  function headers(){
    var _headers = {"Content-Type":mimetype()}; 
    if(!isWebFile()){
      _headers["Cache-Control"] = "max-age=31536000";
    }
    return _headers;
  }

  object.filetype = filetype;
  object.mimetype = mimetype;
  object.isWebFile = isWebFile;
  object.headers = headers;
  return object;
}

module.exports = FileInfo;
