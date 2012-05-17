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
    response = jasmine.createSpyObj('response', ['writeHead', 'write', 'end']);
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
      httpFileResponseWriter = HttpFileResponseWriter(response, filesystem, folderpath, filename);
      filename = 'runner.html';
    });

    it('should attempt to read the file with the correct folderpath, mimetype, callback', function(){
      spyOn(filesystem, 'readFile');
      httpFileResponseWriter.writeToResponse();
      expect(filesystem.readFile).toHaveBeenCalledWith([folderpath,filename].join('/'), 'utf8', httpFileResponseWriter.onFileRead);
    });

  });

  describe('.encoding', function(){
    it('encodes as utf8 if filname is a js,css,html file', function(){
      var files = ['file.js', 'file.css', 'file.html'];

      for(var i = 0; i < files; i++){
        hfrw = HttpFileResponseWriter(null, null, null, files[i]);      
        expect(hfrw.encoding()).toBe('utf8');
      }
    });

    it('encodes as images if filename is a png file', function(){
      hfrw = HttpFileResponseWriter(null, null, null, 'file.png');      
      expect(hfrw.encoding()).toBe('binary');
    });
  });

  describe('.onFileRead', function(){
    var error;
    beforeEach(function(){
      httpFileResponseWriter = HttpFileResponseWriter(response, null, folderpath, filename);
    });

    afterEach(function(){
      error = undefined;
    });

    it('should choose to write the appropiate mime type to the response', function(){
      filename = 'runner.html';
      httpFileResponseWriter.onFileRead(error); 
      expect(response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "text/html"});
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
