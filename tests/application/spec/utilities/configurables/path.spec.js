var nervex = require("./../../../spec_helper").nervex;

describe('Path', function(){
  var injector,
  path;

  beforeEach(function(){
    injector = nervex.bootstrap();  

    injector.config(function($path){
      path = $path;
    });
  });

  describe('.$folder', function(){
    it('accepts a key, value', function(){
      path.$folder('views', '/Project/framework/application/');
    })

    it('throws an exception if the folder is not found', function(){
      expect(function(){path.$folder('views', '/Project/framework/application/')})
      .toThrow('Folder /Project/framework/application was not found');
    });
  });

  describe('.$get', function(){
    it('gets an instance of the the paths object', function(){

    });
  });
});

