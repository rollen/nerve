require('./../../spec_helper');

describe('AssetsController', function(){
  var assetsControllerService,
  request,
  httpFileResponseWriter,
  assetUrlInfoService,
  fileInfoService,
  fileInfo,
  path,
  assetsController;

  describe('show', function(){
    beforeEach(function(){

      fileInfo = function(){};

      injector(function($injector){
        $injector.config(function($request, $path, $fileInfo){
          spyOn($path.$getfilepath(), 'existsSync').andReturn(true);
          $path.$folder('assets', '/app/client/js');
          spyOn($request, '$get').andReturn({url:'/lib/assets/js/file.js'});
          spyOn($fileInfo, '$get').andReturn(fileInfo);
        });
      });

      inject(function($assetsControllerService
                      ,$request
                      ,$httpFileResponseWriter
                      ,$path
                      ,$assetUrlInfoService
                      ,$fileInfoService
                     ){
        assetsController = $assetsControllerService($request,
                                                   $httpFileResponseWriter,
                                                   $path,
                                                   $assetUrlInfoService,
                                                   $fileInfoService
                                                  );
        httpFileResponseWriter = $httpFileResponseWriter;
      })();

        spyOn(httpFileResponseWriter, 'writeToResponseAndEnd');

    });

    it('should write a static file to the response', function(){
      assetsController.show();
      expect(httpFileResponseWriter.writeToResponseAndEnd).
        toHaveBeenCalledWith(fileInfo);
    });
  });
});
