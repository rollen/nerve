Injector = function(){
  function factory_already_exists(func){
    console.log(func);
  }
  var object={};
  object.factories = {};
  object.factory = function(func){
    var name = functionName(func);
    if(factory_already_exists(name)){
    
    };
    object.factories[name] = func;
  }

  object.invoke = function(objectname){
    
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

  return object
}

