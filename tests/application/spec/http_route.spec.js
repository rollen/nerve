require('./../spec_helper');

describe('HttpRoute', function(){
  var route,
  controller,
  matcher,
  action;

  beforeEach(inject(function($httpRouteService, $standardRouteMatcherService){
    matcher = $standardRouteMatcherService('/login','GET');
    route = $httpRouteService('LoginController','index', matcher);
  }));

  describe('match', function(){

    it('should match a path and a method and return its controller an action', function(){
      expect(route.match('/login', 'GET')).toBeTruthy();
      expect(route.match('/login', 'GET').controller).toBe('LoginController');
      expect(route.match('/login', 'GET').action).toBe('index');
    });

    it('should return false if it cannot return a path', function(){
      expect(route.match('/xlogin', 'GET')).toBeFalsy();
    });
  });

  describe('.template', function(){
    it('should return the template used for the match', function(){
      expect(route.template()).toBe('/login');
    });
  });
});
