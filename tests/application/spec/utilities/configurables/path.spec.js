var nervex = require("./../../../spec_helper").nervex;

describe('Path', function(){
  var injector,
  instance,
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
      spyOn(filepath, 'existsSync').andReturn(true);
      path.$folder('views', '/Project/framework/application/');
    })

    it('throws an exception if the folder is not found', function(){
      spyOn(filepath, 'existsSync').andReturn(false);
      expect(function(){path.$folder('views', '/Project/framework/application/')})
      .toThrow('Folder /Project/framework/application/ was not found');
    });
  });


  describe('.$get', function(){
    beforeEach(function(){
      spyOn(filepath, 'existsSync').andReturn(true);
      path.$folder('views', '/Project/framework/application/');
      instance = path.$get();
    });

    it('should be injectable', function(){
      injector.invoke(function($path){
        expect(instance.filepath('views')).toBe($path.filepath('views'));
      });
    });


    describe('.filepath', function(){
      it('returns a copy of the filepath', function(){
        expect(instance.filepath('views')).toEqual('/Project/framework/application/');
      });
    });
  });
});

