function Path(){
  var object = {},
  folders = {},
  filepath;

  object.$filepath = function(_filepath){
    filepath = _filepath;
  }

  object.$folder = function(alias, location){
    if(filepath.exists(location)){
      folders[alias] = location;
    }else{
      throw new Error('Folder ' + location + ' was not found');
    }
  }
  return object;
}

module.exports = Path;

