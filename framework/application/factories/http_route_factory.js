HttpRouteFactory = {};

HttpRouteFactory.createGet = function(pattern, factory, action) {
  var matcher = StandardRouteMatcher(pattern, 'GET');
  return HttpRoute(factory, action, matcher);
}

HttpRouteFactory.createPost = function(pattern, factory, action) {
  var matcher = StandardRouteMatcher(pattern, 'POST');
  return HttpRoute(factory, action, matcher);
}

HttpRouteFactory.createDelete = function(pattern, factory, action) {
  var matcher = StandardRouteMatcher(pattern,'DELETE');
  return HttpRoute(factory, action, matcher);
}

HttpRouteFactory.createPut = function(pattern, factory, action) {
  var matcher = StandardRouteMatcher(pattern, 'PUT');
  return HttpRoute(factory, action, matcher);
}

HttpRouteFactory.build = function(options){
  options = options === null ? {} : options;
  var factory = options['factory'] || ControllerFactory;
  var httpVerb = options['httpVerb'] || 'GET';
  var pathPattern = options['pattern'] = '/home';
  var message = options['message'] = 'index';

  var matcher = StandardRouteMatcher(pathPattern, 'GET');
  return HttpRoute(factory, message, matcher);
}
