require('./../../spec_helper');

describe('HttpFileResponseWriter', function(){
  var filesystem,
  httpFileResponseWriter,
  fileInfoService,
  fileInfo,
  callback,
  response;

  beforeEach(function(){
    filesystem = new SyncFS(require('fs'));
    response = jasmine.createSpyObj('response', ['writeHead', 'write', 'end']);

    injector(function($injector){
      $injector.constant('response', response);
      $injector.constant('filesystem', filesystem);
    });

    inject(function($httpFileResponseWriter, $fileInfoService){
      httpFileResponseWriter = $httpFileResponseWriter;
      fileInfoService = $fileInfoService;
    })();
    fileInfo =  fileInfoService('/tmp', 'runner.html');
  });

  afterEach(function(){
    filesystem = undefined;
    folderpath = undefined;
    httpFileResponseWriter = undefined;
    filename = undefined;
    response = undefined;
  });

  describe('writeToResponse', function(){
    it('should attempt to read the file with the correct folderpath, mimetype, callback', function(){
      spyOn(filesystem, 'readFile');
      var callback = jasmine.createSpy('callback');
      var onFileRead = jasmine.createSpy('onFileRead').andReturn(callback);
      httpFileResponseWriter.onFileRead = onFileRead;


      httpFileResponseWriter.writeToResponse(fileInfo);
      expect(filesystem.readFile).toHaveBeenCalledWith('/tmp/runner.html', 'utf8', callback);
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
