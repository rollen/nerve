var http = require('http');
require('./nervecenter.js');

var port = process.env.PORT || 8888;

http.createServer(function onRequestReceived(request, response){
  var app = Nervebuilder.createApplication(request, response, require('fs'));
  Server(request, response, app)
}).listen(port);

console.log('Listenting on port ' + port);


