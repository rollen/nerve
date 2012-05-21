function Response(){
  var object = {};
  var response;
  object.set = function(_response){
    response = _response; 
  }

  object.$get = function Response(){
    return response;
  }
  return object;
}

module.exports = Response;

