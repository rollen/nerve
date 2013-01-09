// exports.Router = require('./router');

require("fs").readdirSync(__dirname).forEach(function(file){
  function isJavascriptFile(file){
    if(file.match(/^\w(.+)\.js/) && file !== 'index.js' ){
      return true;
    }
    return false;
  }

  function moduleName(file){
    return file.substring(0,1).toUpperCase() + file.substring(1, file.length - 3);
  }

  function filepath(file){
    return  ('./' + moduleName(file)).toLowerCase();
  }

  function requireFile(file){
    if(isJavascriptFile(file)){
      exports[moduleName(file)] = require(filepath(file));
    }
  }

  requireFile(file);
});
