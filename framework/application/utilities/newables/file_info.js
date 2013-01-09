function FileInfo(filepath, filename){
  var object = {};
	object.filepath = filepath;
	object.filename = filename;

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

	function toString(){
		return 'filepath:'+filepath+', ' + 'filename:' + filename
	}

  function headers(){
    var _headers = {"Content-Type":mimetype()}; 
    if(!isWebFile()){
      _headers["Cache-Control"] = "max-age=31536000";
    }
    return _headers;
  }

  function encoding(){
    return isWebFile() ? 'utf8' : 'binary';
  }

  function path(){
    return [filepath, filename].join('/')
  }


  object.filetype = filetype;
  object.mimetype = mimetype;
  object.isWebFile = isWebFile;
  object.headers = headers;
  object.encoding = encoding;
  object.path = path;
	object.toString = toString;
  return object;
}

module.exports = FileInfo;
