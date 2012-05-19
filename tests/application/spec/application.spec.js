require("./../spec_helper");

describe('Application', function(){
  var matcher,
  frameworkRouter,
  applicationRouter,
  errorsController;

  beforeEach(function(){
    frameworkRouter = Router();
    applicationRouter = Router();
    errorsController = new ErrorsController();
  });

  xdescribe('findRouter', function(){
    it('should return the router that can route to a given query', function(){
      application = Application([frameworkRouter], null, '/tests', 'GET');
      spyOn(frameworkRouter, 'hasRouteFor').andReturn(true);
      application.findRouter();
      expect(frameworkRouter.hasRouteFor).toHaveBeenCalledWith('/tests', 'GET');
    });
  });

  xdescribe('executeRequest', function(){
    it('should route the request to the framework if it cannot be handled by the application Router', function(){
      spyOn(frameworkRouter, 'route').andReturn(function(){});
      spyOn(frameworkRouter, 'hasRouteFor').andReturn(true);
      spyOn(applicationRouter, 'hasRouteFor').andReturn(false);
      application = Application([applicationRouter, frameworkRouter], null, '/tests', 'GET');
      application.executeRequest();
      expect(frameworkRouter.route).toHaveBeenCalledWith('/tests', 'GET');
    });

    it('should execute the errorsController if no possible route is found', function(){
      spyOn(errorsController, 'index');
      spyOn(frameworkRouter, 'hasRouteFor').andReturn(false);
      application = Application([frameworkRouter], errorsController, '/tests', 'GET');
      application.executeRequest();
      expect(errorsController.index).toHaveBeenCalled();
    });
  });
});
