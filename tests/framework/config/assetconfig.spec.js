var nervex = require('./../../spec_helper').nervex;

describe('AppConfig', function(){
  var params,
  inject,
	path,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    _nervex.patches();
		_nervex.configure();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  it('should have the configurations of asset_path set', function(){
		var path = require('path')
		, expected_path;
    injector(function($injector){
      $injector.config(function($appConfig){

				expected_path = path.join(project_root, 'framework/application/views/assets');
				expect($appConfig.get('asset_path')).toBeDefined();
				expect($appConfig.get('asset_path')).toEqual([expected_path]);
      });
    });
  });
});
