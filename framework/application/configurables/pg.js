function Pg(constring){
  var object = {};
  object.connectionString = function(val){
    constring = val;
  }

  object.getConnectionString = function(){
    return constring;
  }

  object.$get = function(){
  }

  return object;
}

module.exports = Pg;



