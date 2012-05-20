require('./../spec_helper');

describe( 'Router' , function(){
  var router;

  describe('.route', function(){
    beforeEach(function(){
      injector(function($injector){
        $injector.config(function($router){
          $router.get('/home','AppController','index');
          $router.get('/home','LoginController','index');
          $router.post('/home', 'LoginControlle', 'create');
          $router.del('/home', 'LoginControlle', 'create');
          $router.put('/home', 'LoginControlle', 'create');
        });
      });

      inject(function($router){
        router = $router;
      })();
    });

    it('should return the controller name and action', function(){
      expect(router.route('/home', 'GET')).toBeTruthy();
      expect(router.route('/homex', 'GET')).toBeFalsy();
    });
  });
});

