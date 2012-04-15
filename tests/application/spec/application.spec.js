require("./../spec_helper");

describe('Application', function(){
  beforeEach(function(){
    this.filesystem = new SyncFS(require('fs'));
    this.response = new Response();
    this.request = new Request("/tests");
    this.request.method = 'GET';
    this.testsController = new TestsController(this.request, this.response, this.filesystem, this.frameworkViewsPath);

    this.httpVerb = 'GET';
    this.pattern = '/tests';
    this.controller = new Controller();
    this.message = "index";
    this.route = new HttpRoute(this.httpVerb, this.pattern, this.controller, this.message);
    this.frameworkRouter = new Router([this.route]);
    this.errorsController = new ErrorsController(this.request, this.response);
  });

  describe('findRouter', function(){
    it('should return the router that can route to a given query', function(){
      this.application = Application([this.frameworkRouter], null, this.request.url, this.request.method);
      spyOn(this.frameworkRouter, 'hasRouteFor');
      this.application.findRouter();
      expect(this.frameworkRouter.hasRouteFor).toHaveBeenCalledWith('/tests', this.httpVerb);
    });
  });

  describe('executeRequest', function(){
    it('should route the request to the framework if it cannot be handled by the application Router', function(){
      spyOn(this.frameworkRouter, 'route').andReturn(function(){});
      this.application = Application([this.frameworkRouter], null, this.request.url, this.request.method);
      this.application.executeRequest();
      expect(this.frameworkRouter.route).toHaveBeenCalledWith(this.request.url, this.request.method);
    });

    it('should execute the errorsController if no possible route is found', function(){
      spyOn(this.errorsController, 'index');
      this.application = Application([new Router([])], this.errorsController, this.request.url, this.request.method);
      this.application.executeRequest();
      expect(this.errorsController.index).toHaveBeenCalled();
    });
  });
});
