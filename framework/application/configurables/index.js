
require("fs").readdirSync(__dirname).forEach(function(file){
  if(file.match(/^\w(.+)\.js/) && file !== 'index.js' ){
    var moduleName = file.substring(0,1).toUpperCase() + file.substring(1, file.length - 3);
    var filepath = ('./' + moduleName).toLowerCase();
    exports[moduleName] = require(filepath);
  }
});
