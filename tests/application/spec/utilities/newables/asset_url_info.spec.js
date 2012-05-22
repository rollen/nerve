var nervex = require("./../../../spec_helper").nervex;

describe('AssetUrlInfo', function(){
  var assetUrlInfoService,
  inject,
  injector;


  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });
  
  beforeEach(function(){
    inject(function($assetUrlInfoService){
      assetUrlInfoService = $assetUrlInfoService;
    })();
  });

  describe('.filename', function(){
    it('returns the last part of the url as the filename', function(){
      expect(assetUrlInfoService('/lib/assets/js/file.js').filename()).toBe('file.js'); 
    });
  });

  describe('.path', function(){
    it('returns the initial part of the url as the path', function(){
      expect(assetUrlInfoService('/lib/js/file.js').path()).toBe('/lib/js'); 
    });
  });
});
