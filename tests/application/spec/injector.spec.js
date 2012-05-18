describe('Injector', function(){
  var injector,
  func,
  dependency;

  describe('.factory', function(){
    it("throws an error if a factory is already registered", function(){
      var func = function House(){} 
      injector = Injector();    
      injector.factory(func);
      expect(function(){injector.factory(func)}).toThrow(new Error("Factory House has already been defined"));
    });
  });

  describe('.invoke', function(){
    it('resolves dependencies of a class', function(){
      func = function House($kitchen){
        var object = {};
        object.kitchen = $kitchen;
        object.name = function(){
          return "I am a House";
        }
        return object;
      }

      dependency = function Kitchen(){
        var object = {};
        object.name = function(){
          return "I am a Kitchen";
        }
        return object;
      }

      expect(injector.invoke('Kitchen')).not.toBe(undefined);
    });
  });

  describe('.functionName()', function(){
    beforeEach(function(){
      injector = Injector();
    });
    it('should gets the names of the funciton', function(){
      function Name(){}
      expect(injector.functionName(Name)).toEqual("Name");
    });

    it('should get the name of the function via a variable', function(){
      var o = function NotMyName(){}
      expect(injector.functionName(o)).toEqual('NotMyName');
    });

    it('should thrown an error if the function is anon', function(){
      expect(function(){injector.functionName(function(){})}).toThrow(new Error('Anonymous function passed'));
    });
  });
});
