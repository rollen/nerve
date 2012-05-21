function Path(){
  var object = {},
  folders = {},
  filepath;

  object.$filepath = function(_filepath){
    filepath = _filepath;
  }

  object.$folder = function(alias, location){
    if(filepath.existsSync(location)){
      folders[alias] = location;
    }else{
      throw new Error('Folder ' + location + ' was not found');
    }
  }

  object.$get = function(){
    var o = {};
    o.filepath = function(key){
      return folders[key]; 
    }
    return o;
  }
  return object;
}

module.exports = Path;

