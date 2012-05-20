require('./../spec_helper');

xdescribe( 'Router' , function(){
  var router;

  beforeEach(function(){
    response = new Response();
    filesystem = new SyncFS(require('fs'));
    httproute = new HttpRoute();
  });

  xdescribe('.hasRouteFor', function(){
    beforeEach(function(){
      spyOn(httproute, 'hasAMatchFor');
      router = Router([httproute], request, response, filesystem);
      router.hasRouteFor('/home', 'GET');
    });

    it('should attempt to check if a function has a match', function(){
      expect(httproute.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    });
  });

  xdescribe('.extractPrarms', function(){
  });

  describe('.route', function(){
    beforeEach(function(){

      injector(function($injector){
        $injector.config(function($router){
          $router.get('/home','AppController','index');
        });
      });

      inject(function($router){
        router = $router;
      })();
    });

    it('should return the controller name and action', function(){
      router.route('/home', 'GET');
    });

    //    it('should execute a controller action based on exact match', function(){
    //      httproute.hasAMatchFor.andReturn(true);
    //
    //      router.route('/home', 'GET');
    //      expect(httproute.makeAction).toHaveBeenCalledWith(request, response, filesystem);
    //      expect(httproute.hasAMatchFor).toHaveBeenCalledWith('/home', 'GET');
    //    });
    //
    //    it('should redirect redirect request if not possible to route', function(){
    //      path = '/awesomepage';
    //      lambda = function(){ router.route(path) }
    //      expect(lambda).toThrow('No valid route to ' + path);
    //    });
  });
});

