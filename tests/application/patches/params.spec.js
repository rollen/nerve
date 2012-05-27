var nervex = require('./../../spec_helper').nervex;

xdescribe('params', function(){
  var params,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  it('should retrieve the postparams of an a http request', function(){
    var request = Request('/users/rollen');
    request.method = 'POST';
    request.datastring = '{"name":"rollen"}';

    injector(function($injector){
      $injector.constant('request', Request('/users/rollen'));
      $injector.config(function($router){
        $router.post('/users/rollen');
      });
    });

    inject(function($params){
      expect($params.name).toBe("rollen");
      expect($params).not.toBe(undefined);
    })();
  });
});
