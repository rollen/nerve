require('./../spec_helper');

Feature('injector.spec.js', function(){
  var func,
  dependency;

  Given('a function House with a dependency Kitchen', function(){
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

    When('I regsiter the functions and invoke the injector on House', function(){
      var injector,
      house;

      beforeEach(function(){
        injector = Injector();
        injector.factory(func);
        injector.factory(dependency);
        house = injector.invoke('House');
      });
     
      Then('the instance and its depenencies must be resolved', function(){
        expect(house).not.toBe(undefined);
        expect(house.name()).toBe("I am a House");
        expect(house.kitchen).not.toBe(undefined);
        expect(house.kitchen.name()).toBe("I am a Kitchen");
      });
    });
  });
});
