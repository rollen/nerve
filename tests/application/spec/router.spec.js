require('./../spec_helper');

describe( 'Router' , function(){
  var request,
  response,
  filesystem,
  route,
  params;

  beforeEach(function(){
    request = new Request();
    response = new Response();
    filesystem = new SyncFS(require('fs'));
    route = new HttpRoute();
    params = {}
  });

  describe('hasRouteFor', function(){
    beforeEach(function(){
      spyOn(route, 'hasAMatchFor');
      router = new Router([route], request, response, filesystem);
      router.hasRouteFor('/home', 'GET');
    });

    it('should attempt to check if a function has a match', function(){
      expect(route.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });
  });

  describe('.extractRouteParams', function(){
    it('extract the params given in the urlstring', function(){
    });
  });

  describe('route', function(){
    beforeEach(function(){
      spyOn(route, 'hasAMatchFor');
      spyOn(route, 'makeAction');
      router = new Router([route], request, response, filesystem);
    });

    it('should execute a controller action based on exact match', function(){
      route.hasAMatchFor.andReturn(true);

      router.route('/home', 'GET');
      expect(route.makeAction).toHaveBeenCalledWith(request, response, filesystem);
      expect(route.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });

    it('should redirect redirect request if not possible to route', function(){
      path = '/awesomepage';
      lambda = function(){ router.route(path) }
      expect(lambda).toThrow('No valid route to ' + path);
    });
  });
});

