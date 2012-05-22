function AssetsController(request, httpFileResponseWriter, path, assetUrlInfoService, fileInfoService){
  var object = {};

  object.show = function(){
    var urlInfo = assetUrlInfoService(request.url);
    var filepath = path.join(path.filepath('views'), urlInfo.path());
    var fileInfo = fileInfoService(filepath, urlInfo.filename());
    httpFileResponseWriter.writeToResponseAndEnd(fileInfo);
  }

  return object;
}

module.exports = AssetsController;
