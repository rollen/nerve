var nervex = require('./../../spec_helper').nervex;

describe('AssetsController', function(){
  var assetsControllerService,
  request,
  httpFileResponseWriter,
  assetsUrlInfoService,
  fileInfoService,
  path,
  injector,
  assetsController;

  describe('show', function(){
    beforeEach(function(){
      injector = nervex.bootstrap();

      var _request = {url:'/lib/assets/js/file.js'}
      injector.constant('request', _request);

      injector.invoke(function($assetsControllerService, $request, $httpFileResponseWriter, $path, $assetUrlInfoService, $fileInfoService){
        assetsControllerService = $assetsControllerService;
        request = $request;
        httpFileResponseWriter = $httpFileResponseWriter;
        path = $path;
        assetsUrlInfoService = $assetUrlInfoService;
        fileInfoService = $fileInfoService;
      });

    });

    it('should write a static file to the response', function(){
      spyOn(path, filepath).andReturn('/lib/assets')
      var filename = assetsUrlInfoService(request.url).filename();
      var filepath = path.filepath('assets') + request.url;
      var fileInfo = fileInfoService(filepath, filename);
      console.log(filename);
      console.log(filepath);
      console.log(fileInfo);
    });
  });
});
