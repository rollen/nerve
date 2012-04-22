HttpRouteFactory = {};

HttpRouteFactory.createGet = function(pattern, factory, action) {
  return HttpRoute('GET', pattern, factory, action);
}

HttpRouteFactory.createPost = function(pattern, factory, action) {
  return HttpRoute('POST', pattern, factory, action);
}

HttpRouteFactory.createDelete = function(pattern, factory, action) {
  return HttpRoute('DELETE', pattern, factory, action);
}

HttpRouteFactory.createPut = function(pattern, factory, action) {
  return HttpRoute('PUT', pattern, factory, action);
}

HttpRouteFactory.build = function(options){
    options = options === null ? {} : options;
    var factory = options['factory'] || ControllerFactory;
    var httpVerb = options['httpVerb'] || 'GET';
    var pathPattern = options['pattern'] = '/home';
    var message = options['message'] = 'index';
    return HttpRoute(httpVerb, pathPattern, factory, message);
}
