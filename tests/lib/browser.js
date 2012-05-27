Browser = function(nerve){
  var response = null;
  var browser = {};

  browser.visit = function(url){
    var response = Response();
    var request = Request(url);
    request.method = 'GET';
    var filesystem = new SyncFS(require('fs'));
    
    var injector = nerve(request, response, filesystem).
      bootstrap();

    injector.invoke(function($server){
      $server.run();
    });

    return response;
  }

  browser.post = function(url, json){
    var response = new Response();
    var request = new Request(url);
    request.method = 'POST';
    var filesystem = new SyncFS(require('fs'));

    var injector = nerve(request, response, filesystem).
      bootstrap();

    injector.invoke(function($server){
      $server.run();
    });
    return response;
  }

  return browser;
}

