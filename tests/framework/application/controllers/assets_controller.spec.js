var nervex = require("./../../../spec_helper").nervex;

describe('AssetsController', function(){
  var assetsControllerService,
  request,
  httpFileResponseWriter,
  assetUrlInfoService,
  fileInfoService,
  fileInfo,
  inject,
  injector,
  folderpath,
  assetsController;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

	describe('show', function(){
		it('interfaces with asset service to write file to request', function(){
			inject(function($assetsControllerService){
				asset = jasmine.createSpy('asset');
				request = {url:'/assets/js/file.js'}
				assetsController = $assetsControllerService(asset, request);
			})();

			assetsController.show();
			var expected_filepath = 'js/file.js';
			expect(asset).toHaveBeenCalledWith(expected_filepath, jasmine.any(Function));
		});
	});

  xdescribe('show', function(){
    beforeEach(function(){

      fileInfo = function(){};

      injector(function($injector){
        $injector.config(function($request, $folderpath, $fileInfo){
          spyOn($folderpath.$getfilepath(), 'existsSync').andReturn(true);
          $folderpath.$folder('views', '/app/client/js');
          spyOn($request, '$get').andReturn({url:'/lib/assets/js/file.js'});
          spyOn($fileInfo, '$get').andReturn(fileInfo);
        });
      });

      inject(function($assetsControllerService
                      ,$request
                      ,$httpFileResponseWriter
                      ,$folderpath
                      ,$assetUrlInfoService
                      ,$fileInfoService
                     ){
        assetsController = $assetsControllerService($request,
                                                   $httpFileResponseWriter,
                                                   $folderpath,
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
