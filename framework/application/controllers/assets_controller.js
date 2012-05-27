function AssetsController(request, httpFileResponseWriter, folderpath, assetUrlInfoService, fileInfoService){
  var object = {};

  object.show = function(){
    var urlInfo = assetUrlInfoService(request.url);
    var filepath = folderpath.join(folderpath.filepath('views'), urlInfo.path());
    var fileInfo = fileInfoService(filepath, urlInfo.filename());
    httpFileResponseWriter.writeToResponseAndEnd(fileInfo);
  }

  return object;
}

module.exports = AssetsController;
