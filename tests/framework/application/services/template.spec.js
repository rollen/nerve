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

	beforeEach(function(){
	});
	
	context('template directory has not been set', function(){
		it('throws an error', function(){
			var error = new Error('Template Directory has not been set');
			expect(function(){ inject($template) }).toThrow(error);
		});
	});

	context('template directory has been set' , function(){
		it('throws an error is the directory cannot be found', function(){});
		it('reads a file from the template directory', function(){});
	});
});
