Injector = function(){
  function factory_already_exists(name){
    return object.factories[name] !== undefined;
  }

  function functionArgs(func){
    var regex = /^function.+\((.*?)\)/
    var args = func.toString().match(regex)[1];
    return args ? args.split(', ') : [];
  }

  var object={};
  object.factories = {};

  object.invoke= function(callback){
    var args = functionArgs(callback);
    var instances = [];
    for(var i = 0; i < args.length; i++){
      instances[i] = object.instantiate(args[i]);
    }
    callback.apply(undefined, instances); 
  }

  function normalize(unNormalizedString){
    var regexp = /^\$(.+)/
    var lowerCaseString = unNormalizedString.toLowerCase();
    var match = lowerCaseString.match(regexp);
    var sanitizedString = '';
    if(match){
      sanitizedString = match[1];
    }else{
      sanitizedString = lowerCaseString;
    }
    return sanitizedString;
  }

  object.factory = function(func){
    var name = normalize(object.functionName(func))
    if(factory_already_exists(name)){
      throw new Error('Factory ' + name + ' has already been defined');
    };
    object.factories[name] = func;
  }

  object.dependencies = function(objectname){
    var factoryname = normalize(objectname);
    var factory = object.factories[factoryname];
    if(factory === undefined){
      throw new Error(factoryname+ ' has not been registered');
    }
    return functionArgs(factory);
  }

  object.instantiate = function(objectname){
    objectname = normalize(objectname);
    var dependencies = object.dependencies(objectname);
    var instances = [];
    for(var i = 0; i < dependencies.length; i++){
      instances[i] = object.instantiate(dependencies[i]);
    }
    return object.factories[objectname].apply(undefined, instances); 
  }

  object.functionName = function(func){
    var functionstring = func.toString();
    var regex = /^function\s(.+?)\(/;
    var match = functionstring.match(regex);
    if(match === null){
      throw new Error('Anonymous function passed');
    }
    return match[1];
  }

  object.normalize = normalize;
  return object;
}

