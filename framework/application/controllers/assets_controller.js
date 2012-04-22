AssetsController = function(httpFileResponseWriter){
  var assets_controller = {};
  assets_controller.show = function(){
    httpFileResponseWriter.writeToResponse();
  }
  return assets_controller;
}



