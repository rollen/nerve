var nervex = require("./../spec_helper").nervex;

describe('Server', function(){
  var server,
  application,
  inject,
  injector,
  request;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });


  beforeEach(function(){
    request = new Request();


    injector(function($injector){
      $injector.config(function($request){
        $request.$set(request);
      });
    });

    inject(function($serverService, $request, $application ){
      application = $application;
      spyOn(application, 'executeRequest');
      server = $serverService($request, $application);
    })();
  });
  
  describe('run', function(){
    it('logs the request', function(){

    });

    it('runs the application', function(){
      server.run();
      expect(application.executeRequest).toHaveBeenCalled();
    });
  });
});
