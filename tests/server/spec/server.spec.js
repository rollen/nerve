require('../../application/spec_helper');

describe('Server', function(){
  var server,
  postData,
  executeRequest,
  request;

  beforeEach(function(){
    request = new Request();
    spyOn(request, 'on');
    spyOn(request, 'setEncoding');

    executeRequest = jasmine.createSpy('executeRequest');

    injector(function($injector){
      $injector.config(function($request){
        $request.$set(request);
      });
    });

    inject(function($serverService, $request, $application, $postDataService){
      postData = $postDataService();

      spyOn(postData, 'accept');
      $postDataServiceSpy = jasmine.createSpy('postDataService').andReturn(postData);
      

      server = $serverService($request, $application, $postDataServiceSpy);
      spyOn(server, 'executeRequest').andReturn(executeRequest);
    })();
  });
  
  describe('run', function(){
    it('registers the callbacks for the request object', function(){
      server.run();
      expect(request.setEncoding).toHaveBeenCalledWith('utf8');
      expect(request.on).toHaveBeenCalledWith('data', postData.accept);
      expect(request.on).toHaveBeenCalledWith('end', executeRequest);
    });
  });
});
