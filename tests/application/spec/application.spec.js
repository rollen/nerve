require("./../spec_helper");

describe('Application', function(){
  var matcher,
  router,
  application,
  logincontroller,
  requestService,
  applicationRouter,
  injectorService,
  errorsController;

  beforeEach(function(){
    var request = Request('/login');
    var response = Response();
    
    injector(function($injector){
      $injector.registerService('request', request);
      $injector.registerService('response', request);
    });

    inject(function($requestService, $responseService, $router){

      function LoginController(){
        var object = {};
        object.index = function(){

        }
        return object;
      }

      loginController = LoginController();
      spyOn(loginController, 'index');

      router = $router;
      spyOn(router, 'route').andReturn({controller:'LoginController', action:'index'});

      injectorService = Injector();
      spyOn(injectorService, 'instantiate').andReturn(loginController);
      application = Application($requestService, $requestService, $router, injectorService); 
    })();
  });

  describe('executeRequest', function(){
    it('should create the controller that needs to be instantiated', function(){
      application.executeRequest();
      expect(router.route).toHaveBeenCalledWith('/login','GET');
      expect(injectorService.instantiate).toHaveBeenCalledWith('LoginController');
      expect(loginController.index).toHaveBeenCalled();
    });

    xit('should execute the errorsController if no possible route is found', function(){
    });
  });
});
