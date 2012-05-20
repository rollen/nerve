describe('Injector', function(){
  var injector,
  func,
  dependency;

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
  });

  afterEach(function(){
    injector = undefined;
    func = undefined;
    dependency = undefined;
  });

  describe('.instantiate()', function(){
    beforeEach(function(){
      injector = Injector();    
      injector.factory(dependency);
      injector.factory(func);
    });

    it('throws an error if it cannot find the dependency mentioned', function(){
      expect(function(){ injector.instantiate('BedRoom') }).toThrow(new Error('Injector: bedroom has not been registered'));
    });

    it('instantiates an object', function(){
      expect(injector.instantiate('Kitchen')).not.toBe(undefined);
      expect(injector.instantiate('Kitchen').name()).toBe('I am a Kitchen');
    });

    it('instantiates an object with the objects dependencies', function(){
      var house = injector.instantiate('House');
      expect(house).not.toBe(undefined);
      expect(house.name()).toBe('I am a House');
      expect(house.kitchen).not.toBe(undefined);
      expect(house.kitchen.name()).toBe('I am a Kitchen');
    });

    it('returns the factory if the argument has a Factory at the end', function(){
      var houseFactory = injector.instantiate('HouseFactory');
      expect(houseFactory.$get.name).toBe('House');
    });

    it('returns the $get method if the agument has a Service at the end', function(){
      var houseService = injector.instantiate('HouseService'); 
      expect(houseService.name).toBe('House');
    });
  });

  describe('.normalize', function(){
    beforeEach(function(){
      injector = Injector();
    });

    it('should remove the word Factory from the string', function(){
      expect(injector.normalize('$kitchenFactory')).toBe('kitchen');
    });

    it('should remove the work Service from the string', function(){
      expect(injector.normalize('$kitchenService')).toBe('kitchen');
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
    it("registers the service", function(){
      injector = Injector();    
      injector.factory(func);
    });
  });

  describe('.service', function(){
    it("registers the service", function(){
      var func = function House(){} 
      injector = Injector();    
      injector.service(func);
      expect(injector.factories['house'].$get).toBe(func);
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

  describe('.dependencies', function(){
    it('should return the list of arguments in an array', function(){
      function House() {
        var object = {};
        object.$get = function House(kitchen, bathroom){

        }
        return object;
      } 
      injector = Injector();
      injector.factory(House);
      expect(injector.dependencies('House')).toEqual(['kitchen', 'bathroom']);
    });

    it('should return an empty list when no args', function(){
      function House() {
        var object = {};
        object.$get = function House(){

        }
        return object;
      } 
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
      expect(function(){injector.functionName(function(){})}).toThrow(new Error('Injector: Anonymous function does not have a name'));
    });
  });

  describe('.config()', function(){
    it('should get factories without the need for the factory keyword', function(){
      injector = Injector();
      injector.factory(func);
      injector.config(function($house){
        injector.invoke(function($houseFactory){
          expect($house).toBe($houseFactory);
        });
      });
    });
  });
});
