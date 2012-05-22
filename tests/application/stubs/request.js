Request = function(url){
  var object = {};
  object.url = url;
  object.method = 'GET';
  object.on = function(type, callback){
    if(type === 'data'){
      callback('{"name":"rollen"}');
    }
    if(type === 'end'){
      callback();
    }
  };
  object.setEncoding = function(){};
  return object;
}

