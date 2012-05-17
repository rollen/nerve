require('./../../spec_helper');

describe('HttpFileResponseWriter', function(){
  var filesystem,
  folderpath,
  filename,
  response;

  beforeEach(function(){
    filesystem = new SyncFS(require('fs'));
    folderpath = [Nervebuilder.config['paths']['viewsFolder'], 'tests'].join('/'); //bullshit here
    filename = 'runner.html';
  });

  describe('writeToResponse', function(){
    beforeEach(function(){
      response = jasmine.createSpyObj('response', ['writeHead', 'write', 'end']);
      httpFileResponseWriter = HttpFileResponseWriter(response, filesystem, folderpath, filename);
      filename = 'runner.html';
    });

    it('should call readFile with the correct encoding', function(){
      spyOn(filesystem, 'readFile');
      spyOn(httpFileResponseWriter, 'onFileRead');
      httpFileResponseWriter.writeToResponse();
      expect(filesystem.readFile).toHaveBeenCalledWith([folderpath,filename].join('/'), 'utf8', httpFileResponseWriter.onFileRead);
    });

    it('should close the response after writing', function(){
      httpFileResponseWriter.writeToResponse();
      expect(response.end).toHaveBeenCalled();
    });

    context('should choose the write the appropiate mime type to the response', function(){
      it('accesses a html file', function(){
        filename = 'runner.html';
        httpFileResponseWriter = HttpFileResponseWriter(response, filesystem, folderpath, filename);
        httpFileResponseWriter.writeToResponse(); 
        expect(response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "text/html"});
      });
    });
  });

  describe('.encoding', function(){
    it('encodes as utf8 if its a js,css,html file', function(){
      var filetypes = ['file.js', 'file.css', 'file.html'];

      for(var i = 0; i < filetypes; i++){
        hfrw = HttpFileResponseWriter(null, null, null, filetypes[i]);      
        expect(hfrw.encoding()).toBe('utf8');
      }
    });

    it('encodes as images as a raw file', function(){
      hfrw = HttpFileResponseWriter(null, null, null, 'file.png');      
      expect(hfrw.encoding()).toBe('binary');
    });
  });

  describe('.mimetype', function(){
    context('translates filnames to mimetypes', function(){
      it('tranlates js to application/x-javascript', function(){
        hfrw = HttpFileResponseWriter(null, null, null, 'file.js');      
        expect(hfrw.mimetype()).toBe('application/x-javascript');
      });

      it('tranlates html to text/html', function(){
        hfrw = HttpFileResponseWriter(null, null, null, 'runner.html');      
        expect(hfrw.mimetype()).toBe('text/html');
      });

      it('tranlates css to text/html', function(){
        hfrw = HttpFileResponseWriter(null, null, null, 'file.css');      
        expect(hfrw.mimetype()).toBe('text/css');
      });
    });
  });
});
