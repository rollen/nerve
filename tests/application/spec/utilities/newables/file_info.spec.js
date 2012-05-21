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

    it('tranlates js to application/x-javascript', function(){
      hfrw = fileInfoService(null, 'file.js');      
      expect(hfrw.mimetype()).toBe('application/x-javascript');
    });

    it('tranlates html to text/html', function(){
      hfrw = fileInfoService(null, 'runner.html');      
      expect(hfrw.mimetype()).toBe('text/html');
    });

    it('tranlates css to text/html', function(){
      hfrw = fileInfoService(null, 'file.css');      
      expect(hfrw.mimetype()).toBe('text/css');
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

  describe('.encoding', function(){
    it('should return utf8 for webfiles', function(){
      expect(fileInfo.encoding()).toBe('utf8');
    });
  });
});
