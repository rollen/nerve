require('./../spec_helper');

describe('HttpRoute', function(){
  var action,
  request,
  response,
  filesystem;

  beforeEach(function(){
    action = "index";
    request = new Request();
    response =  new Response();
    filesystem = new SyncFS(require('fs'));
  });
  
  var route,
  matcher;

  describe('.hasAMatchFor', function(){
    it('delegates the match to a matcher strategy', function(){
      matcher = StandardRouteMatcher('/home', 'GET');
      spyOn(matcher, 'hasAMatchFor');

      route = HttpRoute(null, null, matcher); 
      route.hasAMatchFor('/home', 'GET'); 
      expect(matcher.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });
  });

  describe('makeAction', function() {
    beforeEach(function(){
      getRoute = HttpRoute(ControllerFactory, action);
      spyOn(ControllerFactory, 'build').andCallThrough();
    });

    it('should expect the factory to create a instance of its product and have it returned', function(){
      getRoute.makeAction(request, response, filesystem);
      expect(ControllerFactory.build).toHaveBeenCalledWith(request, response, filesystem);
    });
  });
});
