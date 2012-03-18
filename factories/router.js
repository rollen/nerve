Nervebuilder.createRouter = function(request, response, filesystem) {
  var factories = Nervebuilder.createControllerFactories();
  var routes = [ 
    HttpRouteFactory.createGet('/tests', factories['testsController'], 'index'),
    HttpRouteFactory.createGet('/assets/:filename', factories['assetsController'], 'show')
  ];
  return new Router(routes, request, response, filesystem);
}
