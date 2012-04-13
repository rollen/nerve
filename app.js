var http = require('http');
require('./nervecenter.js');

var port = process.env.PORT || 8888;
http.createServer(function onRequestReceived(request, response){
  console.log('attempting to route to ' + request.url);
  Nervebuilder.createApplication(request, response, require('fs')).executeRequest();
}).listen(port);
console.log('Listenting on port ' + port);
