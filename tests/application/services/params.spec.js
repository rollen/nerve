var nervex = require('./../../spec_helper').nervex;

describe('Service.params', function(){
  var $params,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    injector(function($injector){
      $injector.constant('request', Request('/url/53?name=clak&age=26'));
      $injector.config(function(router){
        router.get('/url/:id', null, null);
      });
    });

    inject(function($paramsService, request, router, json, httpUrlParamsExtractorService, postDataService){
      $params = $paramsService(request, router, httpUrlParamsExtractorService, json, postDataService);
    })();
  });

  describe('.all', function(){
    it('should extract all possible params body and url', function(){
      $params.all(function(params){
        expect(params).not.toBe(undefined);
        expect(params.name).toBe('rollen');
        expect(params.age).toBe('26');
      });
    });
  });

  describe('.urlparams', function(){
    it('should parse the current route for params', function(){
      var params = $params.urlparams();
      expect(params).not.toBe(undefined);
      expect(params.name).toBe('clak');
      expect(params.age).toBe('26');
    });
  });

  describe('.postparams', function(){
    it('should gather all the post data before parsing it', function(){
      $params.postparams(function(params){
        expect(params).not.toBe(undefined);
        expect(params.name).toBe("rollen");
      });
    });
  });
});
