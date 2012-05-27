Response = function(){ 
  var object = {};
  object._head = "";
  object._body = "";
  object.writeHead = function(error_code, options){
    object._head = error_code;
  }

  object.write = function(data){
    object._body = data;
  }

  object.end = function(){}
  return object;
}

