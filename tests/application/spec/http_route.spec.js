require('./../spec_helper');

describe('HttpRoute', function(){
  beforeEach(function(){
    this.action = "index";
    this.httpVerb = 'GET';
    this.template = '/home'

    this.request = new Request();
    this.response =  new Response();
    this.filesystem = new SyncFS(require('fs'));
  });


  describe('.hasAMatchFor', function(){
    it('delegates its matching to the matcher', function(){
      
    });
    describe('performs a template match', function() {
      it('should not match a post a get request', function(){
        this.getRoute = HttpRouteFactory.createGet(this.template, null, null);
        expect(this.getRoute.hasAMatchFor('/home', 'POST')).not.toBeTruthy();
      });

      it('should return success for exact match', function(){
        this.getRoute = HttpRouteFactory.createGet(this.template, null, null);
        expect(this.getRoute.hasAMatchFor('/home', 'GET')).toBeTruthy();
      });

      it('should return failure for a no mactch found case', function(){
        this.getRoute = HttpRouteFactory.createGet(this.template, null, null);
        expect(this.getRoute.hasAMatchFor('/homee', 'GET')).toBeFalsy();
      });

      it('should perform a template match', function(){
        this.getRoute = HttpRoute(this.httpVerb, '/home/:id', null, null);
        expect(this.getRoute.hasAMatchFor('/home/12', 'GET')).toBeTruthy();
      });

      it('should perform a root match', function(){
        this.getRoute = HttpRoute(this.httpVerb, '/', null, null);
        expect(this.getRoute.hasAMatchFor('/', 'GET')).toBeTruthy();
      });

      it('should return failure for a path having more components than a template', function(){
        this.getRoute = HttpRoute(this.httpVerb, '/tests', null, null);
        expect(this.getRoute.hasAMatchFor('/angular/angular-scenario.js', 'GET')).toBeFalsy();
      });
    })
  });

  describe('runAction', function() {
    beforeEach(function(){
      this.getRoute = HttpRoute(this.httpVerb, this.template, ControllerFactory, this.action);
      spyOn(ControllerFactory, 'build').andCallThrough();
    });

    it('should expect the factory to create a instance of its product and have it returned', function(){
      this.getRoute.runAction(this.request, this.response, this.filesystem);
      expect(ControllerFactory.build).toHaveBeenCalledWith(this.request, this.response, this.filesystem);
    });
  });
});
