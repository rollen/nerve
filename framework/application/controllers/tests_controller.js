function TestsController(response, postparams){
  var object = {};
  object.create = function(){
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(postparams));
    response.end();
  }
  return object;
}

module.exports = TestsController;
