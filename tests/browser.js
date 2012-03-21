Browser = function(applicationFactory){
  this.response = null;
  this.applicationFactory = applicationFactory || Nervebuilder;
}

Browser.prototype.visit = function(url){
  var response = new Response();
  var request = new Request(url);
  var filesystem = new SyncFS(require('fs'));
  var application = this.applicationFactory.createApplication(request, response, filesystem);
  application.executeRequest();
  this.response = response;
  return response;
}
