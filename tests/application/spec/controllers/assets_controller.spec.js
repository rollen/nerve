require('./../../spec_helper');

describe('AssetsController', function(){
  var assetsController,
  fileInfoService,
  fileInfo;

  describe('show', function(){
    beforeEach(function(){
      injector(function($injector){
      });

      inject(function($assetsController, $request, $fileInfoService){
        assetsController = $assetsController;
        fileInfoService = $fileInfoService;
      })();
    });

    it('should write a static file to the response', function(){
      assetsController.show();
      expect(request.url).toHaveBeenCalled();
      expect(fileParamsService).toHaveBeenCalledWith(url);
    });
  });
});
