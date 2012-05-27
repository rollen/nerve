function TestsController(response, params){
  var object = {};
  object.create = function(){
    response.writeHead(200, {"Content-Type": "application/json"});
    console.log(params);
    response.write(JSON.stringify(params));
    response.end();
  }
  return object;
}

module.exports = TestsController;
