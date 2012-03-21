Response = function(){ 
  this._head = "";
  this._body = "";
}

Response.prototype.writeHead = function(error_code, options){
  this._head = error_code;
}

Response.prototype.write = function(data){
  this._body = data;
}

Response.prototype.end = function(){}

