var nervex = require("./../spec_helper").nervex;

describe('Request', function(){
  var request,
  instance,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    request = {};

    injector(function($injector){
      $injector.config(function($request){
        $request.$set(request);
      });
    });

    inject(function($request){
      instance = $request;       
    })();
  });
  
  it('should be the same request instantiated', function(){
    expect(instance).toBe(request); 
  });
});
