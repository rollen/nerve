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


  function stripDollarSignFromFrontOfString(string){
    var regexp = /^\$(.+)/
    var strippedString;
    var match =  string.match(regexp);
    if(match){
      string = match[1];
    }
    return string;
  }

  function makeStringLowerCase(string){
    return  string.toLowerCase();
  }

  function stripWordFactoryFromEndOfString(string){
    var regexp = /^(.+)(F|f)actory$/
    var match = string.match(regexp);
    if(match){
      string = match[1];  
    }
    return string;
  }

  function normalize(unNormalizedString){
    var tempstring = unNormalizedString;
    tempstring = stripWordFactoryFromEndOfString(tempstring);
    tempstring = makeStringLowerCase(tempstring);
    tempstring = stripDollarSignFromFrontOfString(tempstring);
    return tempstring;
  }

  object.factory = function(func){
    var name = normalize(object.functionName(func))
    if(factory_already_exists(name)){
      throw new Error('Injector: Factory ' + name + ' has already been defined');
    };
    object.factories[name] = func;
  }

  object.dependencies = function(objectname){
    var factoryname = normalize(objectname);
    var factory = getFactory(factoryname);
    return functionArgs(factory);
  }

  function argumentInstances(normalizedName){
    var dependencies = object.dependencies(normalizedName);
    var instances = [];
    for(var i = 0; i < dependencies.length; i++){
      instances[i] = object.instantiate(dependencies[i]);
    }
    return instances;
  }

  function isFactoryName(name){
    return name.match(/Factory$/);
  }

  function getFactory(factoryname){
    var factory = object.factories[factoryname];
    if(factory === undefined){
      throw new Error('Injector: ' + factoryname+ ' has not been registered');
    }
    return factory;
  }

  object.instantiate = function(objectname){
    var normalizedName = normalize(objectname);
    if(isFactoryName(objectname)){
      return getFactory(normalizedName);
    }else{
      var args = argumentInstances(normalizedName);
      return getFactory(normalizedName).apply(undefined, args); 
    }
  }

  object.functionName = function(func){
    var functionstring = func.toString();
    var regex = /^function\s(.+?)\(/
                                   var match = functionstring.match(regex);
                                   if(match === null){
                                     throw new Error('Injector: Anonymous function does not have a name');
                                   }
                                   return match[1];
  }

  object.normalize = normalize;
  return object;
}

