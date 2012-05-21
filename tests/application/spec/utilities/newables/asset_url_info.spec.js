require('./../../../spec_helper');

describe('AssetUrlInfo', function(){
  var assetUrlInfoService;

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
});
