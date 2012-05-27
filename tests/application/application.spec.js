var nervex = require("./../spec_helper").nervex;

describe('Application', function(){
  var matcher,
  router,
  request,
  inject,
  injector,
  application;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
    _injector = _nervex._injector;
  });

  beforeEach(function(){
    request = {url:'/login', method:'GET'};

    function LoginController(){
      var object = {};
      object.index = function(){

      }
      return object;
    }

    injector(function($injector){
      $injector.constant('request', request);
    });

  });

  describe('executeRequest', function(){
    beforeEach(function(){
      inject(function($applicationService, $request, $router){
        router = $router;

        spyOn(_injector, 'instantiate');
        application = $applicationService($request, $router, _injector); 
      })();
    });


    it('should create the controller that needs to be instantiated', function(){
      spyOn(router, 'route').
        andReturn({controller:'LoginController', action:'index'});

      application.executeRequest();

      expect(router.route).
        toHaveBeenCalledWith('/login','GET');

      expect(_injector.instantiate).
        toHaveBeenCalledWith('LoginController', AnyFunction);
    });


    it('should reply with a 404 if no controller', function(){
      spyOn(router, 'route').
        andReturn({controller:'ErrorsController', action:'index'});

      application.executeRequest();

      expect(router.route).
        toHaveBeenCalledWith('/login','GET');

      expect(_injector.instantiate).
        toHaveBeenCalledWith('ErrorsController', AnyFunction);
    });
  });
});
