require('./../../spec_helper');

describe('AssetsController', function(){
  var assetsController,
  httpFileResponseWriter;

  describe('show', function(){
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
