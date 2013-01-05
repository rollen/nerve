function Folderpath(){
  var object = {},
  folders = {},
  filepath = require('fs'),
	path = require('path');

  object.$filepath = function(_filepath){
    filepath = _filepath;
  }

  object.$getfilepath = function(){
    return filepath;
  }

  object.$resolve = function(arg1, arg2){
    return path.resolve(arg1, arg2);
  }

  object.$folder = function(alias, location){
    assertNoTrailingSlash(location);
    assertExistingPath(location);
    folders[alias] = location;
  }

  object.$getfolders = function(){
    return folders;
  }

  function assertNoTrailingSlash(location){
    if(location[location.length - 1] === '/' ){
      throw new Error('The path ' + location + ' should not have a trailing slash');
    }
  }

  function assertExistingPath(location){
    if(!filepath.existsSync(location)){
      throw new Error('Folder ' + location + ' was not found');
    }
  }


  object.$get = function(){
    var o = {};
    o.filepath = function(key){
      if(folders[key]){
        return folders[key]
      } else { 
        throw new Error('alias ' + key + ' was not found');
      }
      return o;
    }

    o.join = function(first, second){
      return path.join(first, second);      
    }
    return o;
  }
  return object;
}

module.exports = Folderpath;

