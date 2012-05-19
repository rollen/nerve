Injector = function(){
  function factory_already_exists(name){
    return object.factories[name] !== undefined;
  }

  var object={};
  object.factories = {};

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
    var regex = /^function.+\((.*?)\)/

    var match = factory.toString().match(regex)[1]
    return match ? match.split(', ') : [];
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

  object.match = function(func){
    var functionstring = func.toString();
    var regex = /^function(\s)(.+?)\(/;
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

  object.normalize = normalize;
  return object;
}

