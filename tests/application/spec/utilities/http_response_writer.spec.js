require('./../../spec_helper');

describe('HttpFileResponseWriter', function(){
  var filesystem,
  folderpath,
  httpFileResponseWriter,
  filename,
  response;

  beforeEach(function(){
    filesystem = new SyncFS(require('fs'));
    folderpath = '/tmp';
    filename = 'runner.html';
  });

  afterEach(function(){
    filesystem = undefined;
    folderpath = undefined;
    httpFileResponseWriter = undefined;
    filename = undefined;
    response = undefined;
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


    context('should choose to write the appropiate mime type to the response', function(){
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
      var files = ['file.js', 'file.css', 'file.html'];

      for(var i = 0; i < files; i++){
        hfrw = HttpFileResponseWriter(null, null, null, files[i]);      
        expect(hfrw.encoding()).toBe('utf8');
      }
    });

    it('encodes as images as a raw file', function(){
      hfrw = HttpFileResponseWriter(null, null, null, 'file.png');      
      expect(hfrw.encoding()).toBe('binary');
    });
  });

  describe('.onFileRead', function(){
    var error;

    afterEach(function(){
      error = undefined;
    });

    it('should close the response if there is an error', function(){
      error = new Error("File not read");
      httpFileResponseWriter.onFileRead(error);
      expect(response.end).toHaveBeenCalled();
    });

    it('should close the response with the mime type of the file on a successful read', function(){
      error = null;
      httpFileResponseWriter.onFileRead(error);
      expect(response.end).toHaveBeenCalled();
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
