require('./../../application/spec_helper')

describe('Reponse', function(){
  var response,
  instance;

  beforeEach(function(){
    response = {};

    injector(function($injector){
      $injector.config(function($response){
        $response.set(response);
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
