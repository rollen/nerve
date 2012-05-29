var nervex = require("./../spec_helper").nervex;

describe('Server', function(){
  var server,
  application,
  console,
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
    request = Request('/users/rollen');
    request.method = 'GET';

    injector(function($injector){
      $injector.config(function($request){
        $request.$set(request);
      });
    });

    inject(function($serverService, $request, $application ){
      application = $application;
      spyOn(application, 'executeRequest');

      console = jasmine.createSpyObj('console', ['log']);

      server = $serverService($request, $application, console);
    })();
  });
  
  describe('run', function(){
    it('logs the request', function(){
      server.run();
      expect(console.log).toHaveBeenCalledWith('attempting to route to /users/rollen with method GET');
    });

    it('runs the application', function(){
      server.run();
      expect(application.executeRequest).toHaveBeenCalled();
    });
  });
});
