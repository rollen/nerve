var nervex = require('./../../spec_helper').nervex;

describe('params', function(){
  var params,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    _nervex.patches();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  it('should retrieve the postparams of an a http request', function(){
    var request = Request('/users/rollen');
    request.method = 'POST';
    request.datastring = '{"name":"rollen"}';

    injector(function($injector){
      $injector.constant('request', request);
      $injector.config(function($router){
        $router.post('/users/rollen', 'UsersController', 'index');
      });
    });

    inject(function($params){
      expect($params.name).toBe("rollen");
      expect($params).not.toBe(undefined);
    })();
  });
});
