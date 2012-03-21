require('./../spec_helper');

describe('HttpRoute', function(){
  beforeEach(function(){
    this.action = "index";
    this.httpVerb = 'GET';
    this.template = '/home'

    this.request = new Request();
    this.response = new Response();
    this.filesystem = new SyncFS(require('fs'));
  });

  describe('hasAMatchFor', function(){
    beforeEach(function(){
      this.route = HttpRouteFactory.createGet(this.template, null, null);
    });

    describe('performs a template match', function() {
      it('should return success for exact match', function(){
        expect(this.route.hasAMatchFor('/home')).toBeTruthy();
      });

      it('should return failure for a no mactch found case', function(){
        expect(this.route.hasAMatchFor('/homee')).toBeFalsy();
      });

      it('should perform a template match', function(){
        this.route = new HttpRoute(this.httpVerb, '/home/:id', null, null);
        expect(this.route.hasAMatchFor('/home/12')).toBeTruthy();
      });

      it('should perform a root match', function(){
        this.route = new HttpRoute(this.httpVerb, '/', null, null);
        expect(this.route.hasAMatchFor('/')).toBeTruthy();
      });

      it('should return failure for a path having more components than a template', function(){
        this.route = new HttpRoute(this.httpVerb, '/tests', null, null);
        expect(this.route.hasAMatchFor('/angular/angular-scenario.js')).toBeFalsy();
      });
    })
  });

  describe('runAction', function() {
    beforeEach(function(){
      this.route = new HttpRoute(this.httpVerb, this.template, ControllerFactory, this.action);
      spyOn(ControllerFactory, 'build').andCallThrough();
    });

    it('should expect the factory to create a instance of its product and have it executed', function(){
      this.route.runAction(this.request, this.response, this.filesystem);
      expect(ControllerFactory.build).toHaveBeenCalledWith(this.request, this.response, this.filesystem);
    });
  });
});
