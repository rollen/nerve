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
    injector.config(function($pg){
      instance = $pg;
    });
  });
  
  describe("connectionString", function(){
    it("sets the connectionString", function(){
      var string = "tcp://localhost";
      instance.connectionString(string);
      expect(instance.getConnectionString()).toBe(string);
    });
  });
});
