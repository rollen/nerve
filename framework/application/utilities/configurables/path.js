function Path(){
  var object = {};
  var folders = {};
  object.$folder = function(name, location){
    folders[name] = location;
  }
  return object;
}

module.exports = Path;

