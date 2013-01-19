var http = require('http');
var nerve = require(__dirname + '/framework/nervecenter.js').nerve;

var port = process.env.PORT || 8080;

http.createServer(function onRequestReceived(request, response){
	console.log(request.url);
  var injector = nerve(request, response).
    bootstrap();

  injector.invoke(function($server){
    $server.run();
  });
}).listen(port);

console.log('Listening on port ' + port);
