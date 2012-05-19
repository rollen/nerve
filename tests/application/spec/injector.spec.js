describe('Injector', function(){
  var injector,
  func,
  dependency;

  beforeEach(function(){
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
  });

  afterEach(function(){
    injector = undefined;
    func = undefined;
    dependency = undefined;
  });

  describe('.normalize', function(){
    beforeEach(function(){
      injector = Injector();
    });

    it('should change $name, to name', function(){
      expect(injector.normalize('$kitchen')).toBe('kitchen');
      expect(injector.normalize('$Kitchen')).toBe('kitchen');
    });

    it('should keep name as name', function(){
      expect(injector.normalize('kitchen')).toBe('kitchen');
    });

    it('should lowercase any string', function(){
      expect(injector.normalize('Kitchen')).toBe('kitchen'); 
    });
  });

  describe('.factory', function(){
    it("registers the factory", function(){
      var func = function House(){} 
      injector = Injector();    
      injector.factory(func);
      expect(injector.factories['house']).toBe(func);
    });
  });

  describe('.invoke', function(){
    beforeEach(function(){
      injector = Injector();
      injector.factory(func);
      injector.factory(dependency);
    });
    it('should accept a callback and pass the instances of an object', function(){
      var house;
      injector.invoke(function($house){
        house = $house 
      });
      expect(house.name()).toBe('I am a House');
    });

    it('should accept a callback with multiple args', function(){
      var house, kitchen;
      injector.invoke(function($house, $kitchen){
        house = $house;
        kitchen = $kitchen;
      });
      expect(house.name()).toBe('I am a House');
      expect(kitchen.name()).toBe('I am a Kitchen');
    });
  });

  describe('.instantiate()', function(){
    beforeEach(function(){
      injector = Injector();    
      injector.factory(dependency);
      injector.factory(func);
    });

    it('throws an error if it cannot find the dependency mentioned', function(){
      expect(function(){ injector.instantiate('BedRoom') }).toThrow(new Error('bedroom has not been registered'));
    });

    it('instantiates an object', function(){
      expect(injector.instantiate('Kitchen')).not.toBe(undefined);
    });

    it('instantiates an object with the objects dependencies', function(){
      var house = injector.instantiate('House');
      expect(house).not.toBe(undefined);
      expect(house.kitchen).not.toBe(undefined);
    });
  });

  describe('.dependencies', function(){
    it('should return the list of arguments in an array', function(){
      function House(kitchen, bathroom) {} 
      injector = Injector();
      injector.factory(House);
      expect(injector.dependencies('House')).toEqual(['kitchen', 'bathroom']);
    });

    it('should return an empty list when no args', function(){
      function House() {} 
      injector = Injector();
      injector.factory(House);
      expect(injector.dependencies('House')).toEqual([]);
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
