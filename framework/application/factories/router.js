Nervebuilder.createRouter = function(request, response, filesystem) {
  var factories = Nervebuilder.createControllerFactories();
  var routes = [ 
    HttpRouteFactory.createGet('/tests', factories['testsController'], 'index'),
    HttpRouteFactory.createGet('/assets/:filename', factories['assetsController'], 'show'),
    HttpRouteFactory.createPost('/tests', factories['testsController'], 'create')
  ];
  r = new Router(routes, request, response, filesystem);
  return r;
}
