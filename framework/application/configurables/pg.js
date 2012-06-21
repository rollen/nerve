function Pg(constring){
  var object = {};
  object.connectionString = function(val){
    constring = val;
  }

  object.getConnectionString = function(){
    return constring;
  }

  return object;
}

module.exports = Pg;



