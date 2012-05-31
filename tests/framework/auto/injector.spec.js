var nervex = require('./../../spec_helper').nervex;

describe('Injector', function(){
  var injector,
  func,
  dependency;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    injector = _nervex._injector;
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
  });

  afterEach(function(){
    injector = undefined;
    func = undefined;
    dependency = undefined;
  });

  describe('.instantiate()', function(){
    beforeEach(function(){
      injector.factory(dependency);
      injector.factory(func);
    });

    it('throws an error if it cannot find the dependency mentioned', function(){
      expect(function(){ injector.instantiate('BedRoom', function(){}) }).toThrow(new Error('Injector: bedroom has not been registered'));
    });

    it('instantiates an object', function(){
      var kitchen;
      injector.instantiate('Kitchen', function($kitchen, name){
        kitchen = $kitchen;
      });
      expect(kitchen).not.toBe(undefined);
      expect(kitchen.name()).toBe('I am a Kitchen');
    });

    it('instantiates an object with the objects dependencies', function(){
      var house;
      injector.instantiate('House', function($house, name){
        house = $house;
      });
      expect(house).not.toBe(undefined);
      expect(house.name()).toBe('I am a House');
      expect(house.kitchen).not.toBe(undefined);
      expect(house.kitchen.name()).toBe('I am a Kitchen');
    });

    it('returns the factory if the argument has a Factory at the end', function(){
      var houseFactory;
      injector.instantiate('HouseFactory', function($houseFactory, name){
        houseFactory = $houseFactory;
      });
      expect(houseFactory.$get.name).toBe('House');
    });

    it('returns the $get method if the agument has a Service at the end', function(){
      var houseService;
      injector.instantiate('HouseService', function($houseService, name){
        houseService = $houseService;
      });

      expect(houseService.name).toBe('House');
    });

    it('should return a raw class', function(){
      injector.instantiate('HouseClass', function($class){
        expect($class).toBe(func);
      });
    });
  });

  describe('.normalize', function(){
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
      injector.factory(func);
    });
  });

  describe('.service', function(){
    it("registers the service", function(){
      var func = function House(){} 
      injector.service(func);
      // Law violation here
      expect(injector.factories['house'].object.$get).toBe(func);
    });
  });


  describe('.invoke', function(){
    beforeEach(function(){
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

    xit('should accept a callback with multiple args', function(){
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
      injector.factory(House);
      expect(injector.dependencies('House')).toEqual([]);
    });
  });

  describe('.functionName()', function(){
    beforeEach(function(){
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
      injector.factory(func);
      injector.config(function($house){
        injector.invoke(function($houseFactory){
          expect($house).toBe($houseFactory);
        });
      });
    });
  });

  describe('.constant()', function(){
    var request,
    instance;
    beforeEach(function(){
      request = {'name':'request'};
      injector.constant('request', request);
    });

    it('should register a factory for a singleton',function(){
      injector.instantiate('request', function($instance){
        instance = $instance;
      });
      expect(request).toBe(instance);
    });

    it('should allow for that singleton to be replaced', function(){
      injector.config(function($request){
        $request.$set('superman');
      });

      injector.instantiate('request', function($instance){
        expect($instance).toBe('superman');
      });
    });
  });

  describe('.registerService()', function(){
    it('should throw and error if the second argument is not a funciton', function(){
      expect(function(){injector.registerService('name', {})}).
        toThrow(new Error('Expected function got [object Object]'));
    });
  });

  describe('.patch()', function(){
    beforeEach(function(){
      injector.service(function params(){
        var hash = {'name':'unpatched'};
        return hash;
      });

      injector.patch('params', function(params, done){
        params.name = 'patched';
        done(params);
      });
    });

    it('registers a patch that gets run after instantiation', function(){
      injector.instantiate('params', function($params){
        expect($params.name).toBe('patched');
      });
    });
  });

  describe('.argumentList()', function(){
    it('should be able to decipher a single line function', function(){
      function name(a, b, c, d){}
      expect(injector.argumentList(name)).toEqual(['a','b','c','d']);
    });

    it('should be able to decipher a multi line funciton', function(){
      function name(a, 
                    b, 
                    c, 
                    d){}
                    expect(injector.argumentList(name)).toEqual(['a','b','c','d']);
    });
  });
});
