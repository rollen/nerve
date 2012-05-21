var nervex = require("./../../../spec_helper").nervex;

describe('Path', function(){
  var injector,
  filepath;

  beforeEach(function(){
    filepath = require('path');
    injector = nervex.bootstrap();  

    injector.config(function($path){
      path = $path;
    });

    path.$filepath(filepath);
  });

  describe('.$folder', function(){
    it('accepts a key, value', function(){
      path.$filepath(filepath);
      spyOn(filepath, 'exists').andReturn(true);
      path.$folder('views', '/Project/framework/application/');
    })

    it('throws an exception if the folder is not found', function(){
      spyOn(filepath, 'exists').andReturn(false);
      expect(function(){path.$folder('views', '/Project/framework/application/')})
      .toThrow('Folder /Project/framework/application/ was not found');
    });
  });

  describe('.$get', function(){
    it('gets an instance of the the paths object', function(){

    });
  });
});

