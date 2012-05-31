var nervex = require('./../../../spec_helper').nervex;

describe( 'Router' , function(){
  var router,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    injector(function($injector){
      $injector.config(function($router){
        $router.get('/home','AppController','index');
        $router.get('/home','LoginController','index');
        $router.post('/home', 'LoginController', 'create');
        $router.del('/home', 'LoginController', 'create');
        $router.put('/home', 'LoginController', 'create');
      });
    });

    inject(function($router){
      router = $router;
    })();
  });

  describe('.route', function(){
    it('should return the controller name and action', function(){
      expect(router.route('/home', 'GET')).toBeTruthy();
      expect(router.route('/home', 'GET').controller).toBe('AppController');
      expect(router.route('/home', 'GET').action).toBe('index');
    });

    it('should return the default controller params is no match is found', function(){
      expect(router.route('/homex', 'GET')).toBeTruthy();
      expect(router.route('/homex', 'GET').controller).toBe('ErrorsController');
      expect(router.route('/homex', 'GET').action).toBe('index');
    });
  });

  describe('.template', function(){
    it('should return the template of the matched route', function(){
      expect(router.template('/home', 'GET')).toBe('/home');
    });
  });
});

