function Server(request, application){
  var object = {};

  object.run = function(){
    console.log('attempting to route to ' + request.url + ' with method ' + request.method);
    application.executeRequest();
  };
  return object;
}

module.exports = Server;
