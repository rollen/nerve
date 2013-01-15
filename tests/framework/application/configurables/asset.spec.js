var nervex = require('./../../../spec_helper').nervex;

describe('Asset', function(){
	var asset
	, httpFileResponseWriter;

	beforeEach(function(){
		var _nervex = nervex.nerve();
		_nervex.loadfiles();
		inject = _nervex.inject;
		injector = _nervex.injector;
	});

	it('should allow any file in the specified directory to be read', function(){
		var onFileWriteComplete = jasmine.createSpy('onFileWriteComplete');
		var writeToResponseSpy = jasmine.createSpy('writeToResponse');
		var expected_filename = 'test.js';
		var expected_filepath = fixturesFolderPath + '/assets';

		injector(function($injector){
			$injector.config(function($appConfig){
				$appConfig.set('asset_path', fixturesFolderPath + '/assets');
			});
		});

		inject(function($assetService, 
				$httpFileResponseWriter, 
				$appConfig,
				$path,
				$fileInfoService){
			httpFileResponseWriter = $httpFileResponseWriter;
			httpFileResponseWriter.writeToResponse = writeToResponseSpy;
			asset = $assetService(httpFileResponseWriter, $appConfig, $path, $fileInfoService);
		})();

		asset('test.js', onFileWriteComplete);

		args = httpFileResponseWriter.writeToResponse.mostRecentCall.args;
		expect(args[0].filename).toBe(expected_filename);
		expect(args[0].filepath).toBe(expected_filepath);
	});
});
