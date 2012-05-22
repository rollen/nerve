Browser = function(applicationFactory){
  var response = null;
  var browser = {};

  browser.visit = function(url){
    var response = new Response();
    var request = new Request(url);
    request.method = 'GET';
    var filesystem = new SyncFS(require('fs'));
    var application = applicationFactory.createApplication(request, response, filesystem);
    application.executeRequest();

    return response;
  }

  browser.post = function(url, json){
    var response = new Response();
    var request = new Request(url);
    request.method = 'POST';
    var filesystem = new SyncFS(require('fs'));
    var application = applicationFactory.createApplication(request, response, filesystem);
    application.executeRequest(json);
    return response;
  }

  return browser;
}

