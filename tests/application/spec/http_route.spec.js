require('./../spec_helper');

describe('HttpRoute', function(){
  beforeEach(function(){
    this.action = "index";

    this.request = new Request();
    this.response =  new Response();
    this.filesystem = new SyncFS(require('fs'));
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

  describe('runAction', function() {
    beforeEach(function(){
      this.getRoute = HttpRoute(ControllerFactory, this.action);
      spyOn(ControllerFactory, 'build').andCallThrough();
    });

    it('should expect the factory to create a instance of its product and have it returned', function(){
      this.getRoute.runAction(this.request, this.response, this.filesystem);
      expect(ControllerFactory.build).toHaveBeenCalledWith(this.request, this.response, this.filesystem);
    });
  });
});
