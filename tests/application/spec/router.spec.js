require('./../spec_helper');

describe( 'Router' , function(){
  beforeEach(function(){
    this.request = new Request();
    this.response = new Response();
    this.filesystem = new SyncFS(require('fs'));
    this.route = new HttpRoute();
    this.params = {}
  });

  describe('hasRouteFor', function(){
    beforeEach(function(){
      spyOn(this.route, 'hasAMatchFor');
      this.router = new Router([this.route], this.request, this.response, this.filesystem);
      this.router.hasRouteFor('/home', 'GET');
    });

    it('should attempt to check if a function has a match', function(){
      expect(this.route.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });
  });

  describe('route', function(){
    beforeEach(function(){
      spyOn(this.route, 'hasAMatchFor');
      spyOn(this.route, 'runAction');
      this.router = new Router([this.route], this.request, this.response, this.filesystem);
    });

    it('should execute a controller action based on exact match', function(){
      this.route.hasAMatchFor.andReturn(true);

      this.router.route('/home', 'GET');
      expect(this.route.runAction).toHaveBeenCalledWith(this.request, this.response, this.filesystem);
      expect(this.route.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });

    it('should redirect redirect request if not possible to route', function(){
      self = this;
      this.path = '/awesomepage';
      this.lambda = function(){ self.router.route(self.path) }
      expect(this.lambda).toThrow('No valid route to ' + this.path);
    });
  });
});

