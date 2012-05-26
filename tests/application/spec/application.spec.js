var nervex = require("./../spec_helper").nervex;

describe('Application', function(){
  var matcher,
  router,
  request,
  response,
  inject,
  injector,
  application,
  logincontroller,
  errorsController;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
    _injector = _nervex._injector;
  });

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
    beforeEach(function(){
      inject(function($applicationService, $request, $response, $router){
        spyOn(loginController, 'index');
        router = $router;

        spyOn(_injector, 'instantiate').andReturn(loginController);
        spyOn(_injector, 'constant');
        application = $applicationService($request, $response, $router, _injector); 
      })();
    });


    it('should create a params object whith postparams', function(){
      spyOn(router, 'route').andReturn({controller:'ErrorsController', action:'index'});
      var json = {name:'Rollen'};

      application.executeRequest(json);

      expect(_injector.constant).
        toHaveBeenCalledWith('postparams', json);
    });


    it('should create the controller that needs to be instantiated', function(){
      spyOn(router, 'route').
        andReturn({controller:'LoginController', action:'index'});

      spyOn(application, 'onControllerCreated').
        andReturn('executed');

      application.executeRequest();

      expect(router.route).
        toHaveBeenCalledWith('/login','GET');

      expect(_injector.instantiate).
        toHaveBeenCalledWith('LoginController', 'executed');
    });


    it('should reply with a 404 if no controller', function(){
      spyOn(router, 'route').
        andReturn({controller:'ErrorsController', action:'index'});

      spyOn(application, 'onControllerCreated').
        andReturn('executed');

      application.executeRequest();

      expect(router.route).
        toHaveBeenCalledWith('/login','GET');

      expect(_injector.instantiate).
        toHaveBeenCalledWith('ErrorsController', 'executed');
    });
  });
});
