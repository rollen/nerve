TestsControllerFactory = function(){}

TestsControllerFactory.build = function(request, response, filesystem){
  var pathToView = [Nervebuilder.config['paths']['viewsFolder'], 'tests', 'runner.html'].join('/');
  return new TestsController(request, response, filesystem, pathToView);  
}
