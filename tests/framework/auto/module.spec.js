var nervex = require("./../../spec_helper").nervex;

xdescribe('Module', function(){
  var module,
  func,
  dependency;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  beforeEach(function(){
    func = function House(){
      var object = {};

      object.$get = function House($kitchen){
        var o = {};
        o.kitchen = $kitchen;
        o.name = function(){
          return "I am a House";
        }
        return o
      }
      return object;
    }

    dependency = function Kitchen(){
      var object = {};
      object.$get = function(){
        var o = {};
        o.name = function(){
          return "I am a Kitchen";
        }
        return o;
      }
      return object;
    }

    inject(function($moduleService){
      module = $module;
    });
  });

  describe('.factory', function(){
    it("registers the service", function(){
      module.factory(func);
    });
  });

  describe('.service', function(){
    it("registers the service", function(){
      var func = function House(){} 
      module.service(func);
      expect(module.factories['house'].object.$get).toBe(func);
    });
  });

});

