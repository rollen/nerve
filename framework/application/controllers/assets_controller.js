function AssetsController(httpFileResponseWriterService){
  var assets_controller = {};
  assets_controller.show = function(){
    httpFileResponseWriter.writeToResponse();
  }
  return assets_controller;
}

module.exports = AssetsController;
