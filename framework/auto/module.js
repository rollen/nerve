function Module(name){
  var object = {};

  object.factory = function(func){
    var name = object.functionName(func)
    if(factory_already_exists(name)){
      throw new Error('Injector: Factory ' + name + ' has already been defined');
    };
    object.register(name, func);
  }

  object.service = function(func){
    var name = object.functionName(func);
    var factory = function(){
      var object = {};
      object.$get = func;
      return object;
    }
    object.register(name, factory);
  }

  object.registerService = function(name, func){
    function isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    };

    if(!isFunction(func)){
      throw('Expected function got ' + func);
    }
    var factory = function(){
      var object = {};
      object.$get = func;
      return object;
    }
    object.register(name, factory);
  }
  object.register = function(unnormalizedName, factory){
    var name = normalize(unnormalizedName);
    object.factories[name] = { 
      'object':factory(),
      'class':factory,
      'patches':[]
    };
  }
  return object;
}

module.exports = Module;
