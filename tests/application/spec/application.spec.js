require("./../spec_helper");

describe('Application', function(){
  var matcher,
  router,
  request,
  response,
  application,
  logincontroller,
  injectorService,
  errorsController;

  beforeEach(function(){
    request = {url:'/login', method:'GET'};
    response = Response();

    function LoginController(){
      var object = {};
      object.index = function(){

      }
      return object;
    }

    loginController = LoginController();
    injector(function($injector){
      $injector.constant('request', request);
      $injector.constant('response', response);
    });

  });

  describe('executeRequest', function(){
    beforeEach(inject(function($request, $response, $router){
      spyOn(loginController, 'index');

      router = $router;

      injectorService = nervex.Injector();

      spyOn(injectorService, 'instantiate').andReturn(loginController);
      application = nervex.Application.Application($request, $response, $router, injectorService); 
    }));

    it('should create the controller that needs to be instantiated', function(){
      spyOn(router, 'route').andReturn({controller:'LoginController', action:'index'});
      application.executeRequest();
      expect(router.route).toHaveBeenCalledWith('/login','GET');
      expect(injectorService.instantiate).toHaveBeenCalledWith('LoginController');
      expect(loginController.index).toHaveBeenCalled();
    });

    it('should reply with a 404 if no controller', function(){
      spyOn(router, 'route').andReturn({controller:'ErrorsController', action:'index'});
      application.executeRequest();
      expect(router.route).toHaveBeenCalledWith('/login','GET');
      expect(injectorService.instantiate).toHaveBeenCalledWith('ErrorsController');
    });
  });
});
