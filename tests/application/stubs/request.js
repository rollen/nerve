Request = function(url){
  var object = {};
  object.url = url;
  object.method = 'GET';
  object.on = function(type, callback){
    if(type == 'end'){
      callback();
    }
  };
  object.setEncoding = function(){};
  return object;
}

