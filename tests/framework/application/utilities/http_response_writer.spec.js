var nervex = require("./../../../spec_helper").nervex;

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
   it('should attempt to read the file and end the response', function(){
      spyOn(fs, 'readFile');
      var callback = jasmine.createSpy('callback');
      var onFileRead = jasmine.createSpy('onFileRead').andReturn(callback);
      httpFileResponseWriter.onFileRead = onFileRead;

      httpFileResponseWriter.writeToResponseAndEnd(fileInfo);

      expect(fs.readFile).toHaveBeenCalledWith('/tmp/runner.html', 
			 'utf8', 
				callback);
    });

  });

  describe('.onFileRead', function(){
    var error;
		var onFileRead;
		var onFileReadComplete;

    beforeEach(function(){
			onFileReadComplete = jasmine.createSpy('onFileReadComplete');
      onFileRead = httpFileResponseWriter.onFileRead(fileInfo, onFileReadComplete); 
    });

    afterEach(function(){
      error = undefined;
    });

   it('should choose to write the appropiate mime type to the response', function(){
      onFileRead(error);
      expect(response.writeHead).toHaveBeenCalledWith(200, {"Content-Type": "text/html"});
    });

   it('should choose to write expiry info and a mimetype if its an image', function(){
      var _expectedHeaders = {
        "Content-Type":"image/png",
        "Cache-Control":"max-age=31536000"
      }
      fileInfo = fileInfoService('/tmp', 'image.png');
      onFileRead = httpFileResponseWriter.onFileRead(fileInfo, onFileReadComplete);
      onFileRead();

      expect(response.writeHead).toHaveBeenCalledWith(200, _expectedHeaders);
    });

   it('should close the response if there is an error', function(){
      fileInfo = fileInfoService('/tmp', 'image.png');
      onFileRead = httpFileResponseWriter.onFileRead(fileInfo, onFileReadComplete);
      error = new Error("File not read");
      onFileRead(error);
      expect(response.end).toHaveBeenCalled();
    });

   it('it should trigger the callback once the file has been read', function(){
      error = null;
      onFileRead(error);
      expect(onFileReadComplete).toHaveBeenCalled();
    });
  });
});
