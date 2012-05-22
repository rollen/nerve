function AssetsController(request, httpFileResponseWriter, path, assetsUrlInfoService, fileInfoService){
  var object = {};

  object.show = function(){
    var filename = assetsUrlInfoService(request.url).filename();
    var filepath = path('assets') + request.url;
    var fileInfo = fileInfoService(filepath, filename);
    httpFileResponseWriter.writeToResponseAndEnd(fileInfo);
  }

  return object;
}

module.exports = AssetsController;
