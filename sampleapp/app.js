var http = require('http');
var nerve = require('./nervex').nerve;

var port = process.env.PORT || 8888;

http.createServer(function onRequestReceived(request, response){
  var injector = nerve(request, response, require('fs')).
    bootstrap();
  
  injector.invoke(function($server){
    $server.run();
  });

}).listen(port);

console.log('Listening on port ' + port);


