require('./../../../spec_helper');

describe('FileInfo',function(){
  var fileInfoService,
  fileInfo;

  beforeEach(function(){
    inject(function($fileInfoService){
      fileInfoService = $fileInfoService;
    })();
    fileInfo = fileInfoService('/lib/js', 'file.js');
  });

  describe('.filetype', function(){
    it('should parse and return the extenstion of a filetype', function(){
      expect(fileInfo.filetype()).toBe('js');
    });
  });

  describe('.isWebFile', function(){
    it('should return true if js,css,html', function(){
      expect(fileInfo.isWebFile()).toBe(true);
    });

    it('should return falsy if not js,css,html', function(){
      expect(fileInfoService('/lib/images', 'file.png').isWebFile()).toBeFalsy();
    });
  });

  describe('.mimetype', function(){
    it('should reutrn the mimetype of the file', function(){
      expect(fileInfo.mimetype()).toBe('application/x-javascript');
    });
  });

  describe('.headers', function(){
    it('should only return the mimetype if a webfile', function(){
      expect(fileInfo.headers()).toBeTruthy();
      expect(fileInfo.headers()['Content-Type']).toBe('application/x-javascript');
      expect(fileInfo.headers()['Cache-Control']).toBe(undefined);
    });

    it('should return both mimetype and cachecontroler', function(){
      fileInfo = fileInfoService('/lib/js', 'file.png');
      expect(fileInfo.headers()).toBeTruthy();
      expect(fileInfo.headers()['Content-Type']).toBe('image/png');
      expect(fileInfo.headers()['Cache-Control']).toBe('max-age=31536000');
    });
  });
});
