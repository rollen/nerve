var nervex = require('./../../../spec_helper').nervex
,	fixtures= require('./../../../spec_helper').fixtures;

describe('Asset', function(){
	var asset
	, httpFileResponseWriter;

	beforeEach(function(){
		var _nervex = nervex.nerve();
		_nervex.loadfiles();
		inject = _nervex.inject;
		injector = _nervex.injector;
	});

	describe('.findAndWriteToResponse', function(){
		it('should resolve all the file read promises', function(){
			var writeToResponseSpy = jasmine.createSpy('writeToResponse');
			var expected_filename = 'test.js';
			var expected_filepath = fixtures.folderPath + '/assets';
			var then;

			injector(function($injector){
				$injector.config(function($appConfig){
					$appConfig.push('asset_path', fixtures.folderPath + '/assets/javascript');
					$appConfig.push('asset_path', fixtures.folderPath + '/html');
					$injector.constant('q', require('q'));
				});
			});

			inject(function($assetService, $q){

				q = $q;
				asset = $assetService(undefined, undefined, undefined, undefined, $q, undefined);
				
				then = jasmine.createSpy('then');
				spyOn($q, 'allResolved')
					.andReturn({then: then});
				spyOn(asset, 'createfileCheckPromises')
					.andReturn(function(){})
				spyOn(asset, 'onAllPromisesResolved')
					.andReturn(function(){});
			})();

			var onFileWriteComplete = jasmine.createSpy('onFileWriteComplete');
			var relative_filename = 'assets/javascript';
			asset.findAndWriteToResponse(relative_filename, onFileWriteComplete);
			expect(asset.createfileCheckPromises).toHaveBeenCalledWith(relative_filename);
			expect(asset.onAllPromisesResolved).toHaveBeenCalledWith(onFileWriteComplete);
			expect(q.allResolved).toHaveBeenCalledWith(jasmine.any(Function));
			expect(then).toHaveBeenCalledWith(jasmine.any(Function));
		});
	});
});
