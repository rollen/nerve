Nervebuilder.createApplication = function(request, response, filesystem){
  var frameworkRouter = Nervebuilder.createRouter(request, response, filesystem);
  var errorsController = new ErrorsController(request, response);
  return new Application([frameworkRouter], errorsController, request.url);
}
