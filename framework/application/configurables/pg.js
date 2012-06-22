function Pg($connectionString, $client){
  var object = {};

  object.connectionString = function(val){
    if(val){
      $connectionString = val;
    } 
    return $connectionString;
  }

  object.client = function(val){
    if(val){
      $client = val;
    }
    return $client
  }

  object.$get = function(){
    return new $client.Client(object.connectionString());
  }

  return object;
}

module.exports = Pg;

