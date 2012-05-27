Request = function(url){
  var object = {};
  object.url = url;
  object.method = 'GET';

  object.datastring = '{"name":"rollen"}';

  object.on = function(type, callback){
    if(type === 'data'){
      callback(object.datastring);
    }
    if(type === 'end'){
      callback();
    }
  };
  object.setEncoding = function(){};
  return object;
}

