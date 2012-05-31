var nervex = require("./../../spec_helper").nervex;

describe('Reponse', function(){
  var response,
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
    response = {};

    injector(function($injector){
      $injector.config(function($response){
        $response.$set(response);
      });
    });

    inject(function($response){
      instance = $response;       
    })();
  });
  
  it('should be the same response instantiated', function(){
    expect(instance).toBe(response); 
  });
});
