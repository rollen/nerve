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
  injector,
  errorsController;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
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
      inject(function($request, $response, $router){
        spyOn(loginController, 'index');
        router = $router;

        injector = nervex.Injector();

        spyOn(injector, 'instantiate').andReturn(loginController);
        spyOn(injector, 'constant');
        application = nervex.Application.Application($request, $response, $router, injector); 
      })();
    });

    it('should create a params object whith postparams', function(){
      spyOn(router, 'route').andReturn({controller:'ErrorsController', action:'index'});
      var json = {name:'Rollen'};
      application.executeRequest(json);
      expect(injector.constant).toHaveBeenCalledWith('postparams', json);
    });

    it('should create the controller that needs to be instantiated', function(){
      spyOn(router, 'route').andReturn({controller:'LoginController', action:'index'});
      application.executeRequest();
      expect(router.route).toHaveBeenCalledWith('/login','GET');
      expect(injector.instantiate).toHaveBeenCalledWith('LoginController');
      expect(loginController.index).toHaveBeenCalled();
    });

    it('should reply with a 404 if no controller', function(){
      spyOn(router, 'route').andReturn({controller:'ErrorsController', action:'index'});
      application.executeRequest();
      expect(router.route).toHaveBeenCalledWith('/login','GET');
      expect(injector.instantiate).toHaveBeenCalledWith('ErrorsController');
    });
  });
});
