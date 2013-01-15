var nervex = require("./../../../spec_helper").nervex;

describe('AppConfig', function(){
  var injector,
  inject;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });
	
	it('should allow for the configuration of the templatefolder_path key', function(){
		var value;

		injector(function($injector){
			$injector.config(function($appConfig){
				$appConfig.set('templatefolder_path', fixturesFolderPath);
			});
		});

		inject(function($appConfig){
			value = $appConfig('templatefolder_path');	
		})();

		expect(value).toBe(fixturesFolderPath);
	});

	describe('.push', function(){
		it('should allow multiple values to be assigned to a key', function(){
			injector(function($injector){
				$injector.config(function($appConfig){
					$appConfig.push('key', '/hello');
					$appConfig.push('key', '/hi');
				});
			});

			inject(function($appConfig){
				value = $appConfig('key');	
			})();
			
			expect(value).toEqual(['/hello','/hi']);
		});
	});
});
