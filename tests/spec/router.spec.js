require('./../spec_helper');

describe( Router, function(){
  beforeEach(function(){
    this.route = HttpRouteFactory.build({'pattern':'/home'});
    this.request = new Request();
    this.response = new Response();
    this.filesystem = new SyncFS(require('fs'));
    this.router = new Router([this.route], this.request, this.response, this.filesystem);
  });

  describe('hasRouteFor', function(){
    it('should return true if the router can respond to the route', function(){
      expect(this.router.hasRouteFor('/home', 'GET')).toBeTruthy();
    });

    it('should return false if the router cannot respond to the route', function(){
      expect(this.router.hasRouteFor('/awesomepage', 'GET')).not.toBeTruthy();
    });
  });

  describe('route', function(){
    beforeEach(function(){
      spyOn(this.route, 'runAction');
    });

    it('should execute a controller action based on exact match', function(){
      this.router.route('/home');
      expect(this.route.runAction).toHaveBeenCalledWith(this.request, this.response, this.filesystem);
    });

    it('should redirect redirect request if not possible to route', function(){
      self = this;
      this.path = '/awesomepage';
      this.lambda = function(){ self.router.route(self.path) }
      expect(this.lambda).toThrow('No valid route to ' + this.path);
    });
  });
});

