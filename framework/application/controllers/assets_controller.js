function AssetsController(request, httpFileResponseWriter, path, assetUrlInfoService, fileInfoService){
  var object = {};

  object.show = function(){
    var filename = assetUrlInfoService(request.url).filename();
    var filepath = [path.filepath('assets'),request.url].join('/');
    var fileInfo = fileInfoService(filepath, filename);
    httpFileResponseWriter.writeToResponseAndEnd(fileInfo);
  }

  return object;
}

module.exports = AssetsController;
