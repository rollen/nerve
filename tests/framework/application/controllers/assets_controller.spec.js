var nervex = require("./../../../spec_helper").nervex;

describe('AssetsController', function(){
  var assetsControllerService,
  request,
  httpFileResponseWriter,
  inject,
  injector,
	asset,
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
			inject(function($assetsControllerService, $assetService){
				asset = $assetService();
				spyOn(asset, 'findAndWriteToResponse')
				request = {url:'/assets/js/file.js'}
				assetsController = $assetsControllerService(asset, request);
			})();

			assetsController.show();
			var expected_filepath = 'js/file.js';
			expect(asset.findAndWriteToResponse).toHaveBeenCalledWith(expected_filepath, jasmine.any(Function));
		});
	});
});
