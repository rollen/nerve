require('./../../application/spec_helper')

describe('Request', function(){
  var request,
  instance;

  beforeEach(function(){
    request = {};

    injector(function($injector){
      $injector.config(function($request){
        $request.set(request);
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
