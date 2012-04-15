require('./../../spec_helper');

describe('AssetsController', function(){
  describe('show', function(){
    beforeEach(function(){
      this.httpFileResponseWriter = HttpFileResponseWriterBuilder.build();
      spyOn(this.httpFileResponseWriter, 'writeToResponse');
      this.assetsController = AssetsController(this.httpFileResponseWriter);
    });

    it('should write a static file to the response', function(){
      this.assetsController.show();
      expect(this.httpFileResponseWriter.writeToResponse).toHaveBeenCalled();
    });
  });
});
