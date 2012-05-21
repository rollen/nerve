function AssetsController(request, httpFileResponseWriter, fileInfoService, fileParamsService){
  var assets_controller = {};
  assets_controller.show = function(){
    httpFileResponseWriter.writeToResponseAndEnd();
  }
  return assets_controller;
}

module.exports = AssetsController;
