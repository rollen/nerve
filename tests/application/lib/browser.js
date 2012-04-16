Browser = function(applicationFactory){
  var response = null;

  browser = {};

  browser.visit = function(url){
    var response = new Response();
    var request = new Request(url);
    request.method = 'GET';
    var filesystem = new SyncFS(require('fs'));
    var application = applicationFactory.createApplication(request, response, filesystem);
    application.executeRequest();

    return response;
  }

  return browser;
}

