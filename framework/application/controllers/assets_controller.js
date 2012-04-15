AssetsController = function(httpFileResponseWriter){
  assets_controller = {};
  assets_controller.show = function(){
    httpFileResponseWriter.writeToResponse();
  }
  return assets_controller;
}



