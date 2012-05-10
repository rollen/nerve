require('./../../spec_helper');

describe('HttpFileResponseWriter', function(){
  beforeEach(function(){
    this.filesystem = new SyncFS(require('fs'));
    this.folderpath = [Nervebuilder.config['paths']['viewsFolder'], 'tests'].join('/');
    this.filename = 'runner.html';
  });

  describe('writeToResponse', function(){
    beforeEach(function(){
      this.response = jasmine.createSpyObj('response', ['writeHead', 'write', 'end']);
      this.httpFileResponseWriter = HttpFileResponseWriter(this.response, this.filesystem, this.folderpath, this.filename);
      this.filename = 'runner.html';
    });

    it('should output the file into the response', function(){
      this.httpFileResponseWriter.writeToResponse();
      expect(this.response.write).toHaveBeenCalledWith(Fixtures.file(this.filename, 'html'));
    });

    it('should close the response after writing', function(){
      this.httpFileResponseWriter.writeToResponse();
      expect(this.response.end).toHaveBeenCalled();
    });

    context('should choose the write the appropiate mime type to the response', function(){
      it('accesses a html file', function(){
        this.filename = 'runner.html';
        this.httpFileResponseWriter = HttpFileResponseWriter(this.response, this.filesystem, this.folderpath, this.filename);
        this.httpFileResponseWriter.writeToResponse(); 
        expect(this.response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "text/html"});
      });

      it('accesses a javascript file', function(){
        this.filename = 'angular.js';
        this.httpFileResponseWriter = HttpFileResponseWriter(this.response, this.filesystem, this.folderpath, this.filename);
        this.httpFileResponseWriter.writeToResponse();
        expect(this.response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "application/x-javascript"});
      });
    });
  });

  describe('.encoding', function(){
    it('encodes as utf8 if its a js,css,html file', function(){
      hfrw = HttpFileResponseWriter(null, null, null, 'file.js');      
      expect(hfrw.encoding()).toBe('utf8');
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
