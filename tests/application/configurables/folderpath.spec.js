var nervex = require("./../../spec_helper").nervex;

describe('FolderPath', function(){
  var injector,
  instance,
  inject,
  filepath;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    filepath = require('path');

    injector(function($injector){
      $injector.config(function($folderpath){
        folderpath = $folderpath;
      });
    });
    folderpath.$filepath(filepath);
  });

  describe('.$folder', function(){
    it('accepts a key, value', function(){
      folderpath.$filepath(filepath);
      spyOn(filepath, 'existsSync').andReturn(true);
      folderpath.$folder('views', '/Project/framework/application');
    })

    it('throws an exception if the folder is not found', function(){
      spyOn(filepath, 'existsSync').andReturn(false);
      expect(function(){folderpath.$folder('views', '/Project/framework/application')})
      .toThrow('Folder /Project/framework/application was not found');
    });

    it('throws an exception if the path has a trailing slash', function(){
      spyOn(filepath, 'existsSync').andReturn(false);
      expect(function(){folderpath.$folder('views', '/Project/framework/application/')})
      .toThrow('The path /Project/framework/application/ should not have a trailing slash');
    });
  });


  describe('.$get', function(){
    beforeEach(function(){
      spyOn(filepath, 'existsSync').andReturn(true);
      folderpath.$folder('views', '/Project/framework/application');
      instance = folderpath.$get();
    });

    it('should be injectable', function(){
      inject(function($folderpath){
        expect(instance).toBe($folderpath);
      });
    });

    describe('.filepath', function(){
      it('returns a copy of the filepath', function(){
        expect(instance.filepath('views')).toEqual('/Project/framework/application');
      });

      it('throws an error if the alias is not found', function(){
        expect(function(){instance.filepath('folder')}).toThrow('alias folder was not found');
      });
    });
  });
});

