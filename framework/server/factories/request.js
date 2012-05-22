function Request(){
  var object = {};
  var request;
  object.$set = function(_request){
    request = _request; 
  }

  object.$get = function Request(){
    return request;
  }
  return object;
}

module.exports = Request;
