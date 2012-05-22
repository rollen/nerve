Request = function(url){
  var object = {};
  object.url = url;
  object.method = 'GET';
  object.on = function(){};
  object.setEncoding = function(){};
  return object;
}

