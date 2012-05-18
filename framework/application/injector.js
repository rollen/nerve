Injector = function(){
  function factory_already_exists(name){
    return object.factories[name] !== undefined;
  }

  var object={};

  object.factory = function(func){
    var name = object.functionName(func);
    if(factory_already_exists(name)){
      throw new Error("Factory " + name + " has already been defined");
    };
    object.factories[name] = func;
  }

  object.invoke = function(objectname){
    return object.factories[objectname](); 
  }

  object.match = function(func){
    var functionstring = func.toString();
    var regex = /^function(\s)(.+)\(\)/;
    var match = functionstring.match(regex);
    if(match === null){
      throw new Error('Anonymous function passed');
    }
    return match;
  }

  object.functionName = function(func){
    var match = object.match(func);
    return match[2];
  }

  object.factories = {};

  return object
}

