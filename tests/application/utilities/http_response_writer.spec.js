var nervex = require("./../../spec_helper").nervex;

describe('HttpFileResponseWriter', function(){
  var fs,
  httpFileResponseWriter,
  fileInfoService,
  fileInfo,
  callback,
  inject,
  injector,
  response;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });


  beforeEach(function(){
    fs = new SyncFS(require('fs'));
    response = jasmine.createSpyObj('response', ['writeHead', 'write', 'end']);

    injector(function($injector){
      $injector.constant('response', response);
      $injector.constant('fs', fs);
    });

    inject(function($httpFileResponseWriter, $fileInfoService){
      httpFileResponseWriter = $httpFileResponseWriter;
      fileInfoService = $fileInfoService;
    })();
    fileInfo =  fileInfoService('/tmp', 'runner.html');
  });

  afterEach(function(){
    fs = undefined;
    folderpath = undefined;
    httpFileResponseWriter = undefined;
    filename = undefined;
    response = undefined;
  });

  describe('writeToResponseAndEnd', function(){
    it('should attempt to read the file with the correct folderpath, mimetype, callback', function(){
      spyOn(fs, 'readFile');
      var callback = jasmine.createSpy('callback');
      var onFileRead = jasmine.createSpy('onFileRead').andReturn(callback);
      httpFileResponseWriter.onFileRead = onFileRead;


      httpFileResponseWriter.writeToResponseAndEnd(fileInfo);
      expect(fs.readFile).toHaveBeenCalledWith('/tmp/runner.html', 'utf8', callback);
    });

  });

  describe('.onFileRead', function(){
    var error;
    beforeEach(function(){
      callback = httpFileResponseWriter.onFileRead(fileInfo); 
    });

    afterEach(function(){
      error = undefined;
    });

    it('should choose to write the appropiate mime type to the response', function(){
      callback(error);
      expect(response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "text/html"});
    });

    it('should choose to write expiry info and a mimetype if its an image', function(){
      var _expectedHeaders = {
        "Content-Type":"image/png",
        "Cache-Control":"max-age=31536000"
      }
      fileInfo = fileInfoService('/tmp', 'image.png');
      callback = httpFileResponseWriter.onFileRead(fileInfo);
      callback();

      expect(response.writeHead).toHaveBeenCalledWith(200, _expectedHeaders);
    });

    it('should close the response if there is an error', function(){
      fileInfo = fileInfoService('/tmp', 'image.png');
      callback = httpFileResponseWriter.onFileRead(fileInfo);
      error = new Error("File not read");
      callback(error);
      expect(response.end).toHaveBeenCalled();
    });

    it('should close the response with the mime type of the file on a successful read', function(){
      error = null;
      callback(error);
      expect(response.end).toHaveBeenCalled();
    });
  });
});
