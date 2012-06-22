var nervex = require("./../../../spec_helper").nervex;

describe('PgFactory', function(){
  var injector,
  instance,
  inject;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    injector(function($injector){
      $injector.config(function($pg){
        instance = $pg;
      });
    });
  });

  describe("connectionString", function(){
    it("sets the connectionString", function(){
      var string = "tcp://localhost";
      instance.connectionString(string);
      expect(instance.connectionString()).toBe(string);
    });
  });

  describe("client", function(){
    it("sets the client", function(){
      var fakepg = {};
      fakepg.connect = function(){}

      instance.client(fakepg);
      expect(instance.client()).toBe(fakepg);
    });
  });

  describe('.$get', function(){
    it('should be injectable', function(){
      inject(function($pg){
        expect($pg).toBeDefined();
      });
    });
  });
});

