require('./../spec_helper');

describe( 'Router' , function(){
  var request,
  response,
  filesystem,
  httproute,
  router,
  params;

  beforeEach(function(){
    request = new Request();
    response = new Response();
    filesystem = new SyncFS(require('fs'));
    httproute = new HttpRoute();
    params = {}
  });

  describe('.hasRouteFor', function(){
    beforeEach(function(){
      spyOn(httproute, 'hasAMatchFor');
      router = Router([httproute], request, response, filesystem);
      router.hasRouteFor('/home', 'GET');
    });

    it('should attempt to check if a function has a match', function(){
      expect(httproute.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });
  });

  describe('.extractPrarms', function(){
  });

  describe('.route', function(){
    beforeEach(function(){
      spyOn(httproute, 'hasAMatchFor');
      spyOn(httproute, 'makeAction');
      router = Router([httproute], request, response, filesystem);
    });

    it('should execute a controller action based on exact match', function(){
      httproute.hasAMatchFor.andReturn(true);

      router.route('/home', 'GET');
      expect(httproute.makeAction).toHaveBeenCalledWith(request, response, filesystem);
      expect(httproute.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });

    it('should redirect redirect request if not possible to route', function(){
      path = '/awesomepage';
      lambda = function(){ router.route(path) }
      expect(lambda).toThrow('No valid route to ' + path);
    });
  });
});

