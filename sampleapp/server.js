var http = require('http');
var nerve = require('nervex').nerve;
console.log(nerve);
var app = require('./app');

var port = process.env.PORT || 8888;

http.createServer(function onRequestReceived(request, response){
  var injector = nerve(request, response).
    bootstrap(app);

  injector.invoke(function($server){
    $server.run();
  });

}).listen(port);

console.log('Listening on port ' + port);


