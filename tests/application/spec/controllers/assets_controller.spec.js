require('./../../spec_helper');

describe('AssetsController', function(){
  var assetsController;

  describe('show', function(){
    beforeEach(function(){
      injector(function($injector){
        $injector.registerService('request', Request());
        $injector.registerService('response', Response());
      });

      inject(function($assetsController){
        assetsController = $assetsController;
      })();
    });

    beforeEach(function(){
      httpFileResponseWriter = HttpFileResponseWriterBuilder.build();
      spyOn(httpFileResponseWriter, 'writeToResponse');
      assetsController = AssetsController(httpFileResponseWriter);
    });

    it('should write a static file to the response', function(){
      assetsController.show();
      expect(httpFileResponseWriter.writeToResponse).toHaveBeenCalled();
    });
  });
});
