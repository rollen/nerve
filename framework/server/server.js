function Server(request, application, postDataService){
  var object = {};

  object.run = function(){
    var postData = postDataService(JSON, '');

    //console.log('attempting to route to ' + request.url + ' with method ' + request.method);
    request.setEncoding('utf8');
    request.on('data', postData.accept);
    request.on('end', object.executeRequest(postData));
  };

  object.executeRequest = function(postData){
    return function(){
      application.executeRequest(postData.json());
    }
  }
  return object;
}

module.exports = Server;
