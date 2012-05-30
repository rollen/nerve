function HelloWorldController(response){
  var object = {};
  object.index = function(){
    response.write("<h1>Hello World</h1>");
    response.end();
  }
  return object;
}

module.exports = HelloWorldController;
