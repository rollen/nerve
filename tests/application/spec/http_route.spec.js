require('./../spec_helper');

describe('HttpRoute', function(){
  describe('match', function(){
    var route,
    controller,
    matcher,
    action;

    beforeEach(inject(function($httpRouteService, $standardRouteMatcherService){
      matcher = $standardRouteMatcherService('/login','GET');
      route = $httpRouteService('LoginController','index', matcher);
    }));

    it('should match a path and a method', function(){
      expect(route.match('/login', 'GET')).toBeTruthy();
      expect(route.match('/login', 'GET').controller).toBe('LoginController');
      expect(route.match('/login', 'GET').action).toBe('index');
    });
  });
});
