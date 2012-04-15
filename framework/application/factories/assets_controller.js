AssetsControllerFactory = function(){}

AssetsControllerFactory.build = function(request, response, filesystem){
  var assetsFolderView = [Nervebuilder.config['paths']['viewsFolder'], 'assets' ].join('/');
  var filename = AssetsControllerFactory.extractFilenameFromUrl(request.url);
  var httpFileResponseWriter = new HttpFileResponseWriter(response, filesystem, assetsFolderView,filename); 
  return AssetsController(httpFileResponseWriter);  
}

AssetsControllerFactory.extractFilenameFromUrl = function(url){
  return url.split('/').pop();
}
