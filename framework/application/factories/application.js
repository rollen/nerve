Nervebuilder.createApplication = function(request, response, filesystem){
  var frameworkRouter = Nervebuilder.createRouter(request, response, filesystem);
  var errorsController = ErrorsController(request, response);
  return Application([frameworkRouter], errorsController, request.url, request.method);
}
