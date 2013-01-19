var nervex = require('./../../../spec_helper').nervex;

describe('Service.template', function(){
  var $params,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

	context('has not set its directory', function(){
		xit('throws an error', function(){
			var template;
			var error = new Error('Template Directory has not been set');

			injector(function($injector){
				$injector.constant('appConfig', function(){}); 
			});

			var injectTemplate = function(){
				inject(function($template){
					$template();
				})();
			}


			expect(injectTemplate).toThrow(error);
		});
	});

	context('has its directory set' , function(){
		it('should reads a file from the template directory', function(){
			var fileInfoService,
			httpFileResponseWriter,
			onFileReadComplete,
			fileInfoValue,
			args;

			onFileReadComplete = jasmine.createSpy('onFileReadComplete');

			injector(function($injector){
				$injector.config(function($appConfig){
					$appConfig.set('templatefolder_path', fixtures.folderPath + '/fake');
				});
			});


			inject(function($templateService, $appConfig, $fs, $httpFileResponseWriter, $fileInfoService){
				fileInfoService = $fileInfoService
				spyOn($httpFileResponseWriter, 'writeToResponse');
				httpFileResponseWriter = $httpFileResponseWriter;
				template = $templateService($appConfig, $fs, $httpFileResponseWriter, $fileInfoService);
			})();

			template('index.html', onFileReadComplete);

			fileInfoValue = fileInfoService(fixtures.folderPath + '/fake', 'index.html');

			// Equality operator does not work with my object defintion
			args = httpFileResponseWriter.writeToResponse.mostRecentCall.args;
			expect(args[0].filename).toBe(fileInfoValue.filename);
			expect(args[0].filepath).toBe(fileInfoValue.filepath);
		});
	});
});

