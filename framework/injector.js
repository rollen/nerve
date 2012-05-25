function Injector(name){
  function factory_already_exists(name){
    return object.factories[name] !== undefined;
  }

  function stripWhiteSpace(string){
    return string.replace(/\s/g, '');
  }

  var object={};
  object.factories = {};


  function initDependencies(listOfDependencies, onAllDependenciesInstantiated){
    var instances = {};
    var count = 0;

    function onSingleArgInstantiated(object, name){
      instances[name] = object;
      count++;
      if(count === listOfDependencies.length){
        var orderedInstances = orderObject(listOfDependencies, instances);
        onAllDependenciesInstantiated(orderedInstances);
      }
    }

    if(listOfDependencies.length === 0){
      onAllDependenciesInstantiated([]);
    }else{
      for(var i = 0; i < listOfDependencies.length; i++){
        object.instantiate(listOfDependencies[i],
                           onSingleArgInstantiated);
      }
    }
  }

  function initObjectFromInjector(normalizedName, onAllArgumentsInstantiated){
    var dependencies = object.dependencies(normalizedName);
    initDependencies(dependencies, function(instances){
      onAllArgumentsInstantiated(instances);
    });
  }

  object.invoke= function(functionToInstantiate, argsCallback){
    var args = argumentList(functionToInstantiate);
    var instances;
    if(argsCallback){
      args = argsCallback(args);
    }
    initDependencies(args, function(instances){
      functionToInstantiate.apply(undefined, instances); 
    });
  }

  object.config = function(callback){
    object.invoke(callback, function(args){
      for(var i = 0; i < args.length; i++){
        args[i] = args[i]+'Factory';
      }
      return args;
    });
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

  function stripWordFromEndOfString(string, regexSegment){
    var regexp = new RegExp('^(.+)' + regexSegment + '$');
    var match = string.match(regexp);
    if(match){
      string = match[1];  
    }
    return string;
  }

  function normalize(unNormalizedString){
    var tempstring = unNormalizedString;
    tempstring = stripWordFromEndOfString(tempstring, '(F|f)actory');
    tempstring = stripWordFromEndOfString(tempstring, '(S|f)ervice');
    tempstring = makeStringLowerCase(tempstring);
    tempstring = stripDollarSignFromFrontOfString(tempstring);
    return tempstring;
  }

  object.factory = function(func){
    var name = normalize(object.functionName(func))
    if(factory_already_exists(name)){
      throw new Error('Injector: Factory ' + name + ' has already been defined');
    };
    object.register(name, func);
  }

  object.service = function(func){
    var name = normalize(object.functionName(func))
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

  object.register = function(name, factory){
    object.factories[name] = factory();
  }



  function isFactoryName(name){
    return name.match(/Factory$/);
  }

  function isServiceName(name){
    return name.match(/Service$/);
  }

  function getFactory(factoryname){
    var factory = object.factories[factoryname];
    if(factory === undefined){
      throw new Error('Injector: ' + factoryname+ ' has not been registered');
    }
    return factory;
  }

  object.instantiate = function(objectname, onInstantiated){
    var normalizedName = normalize(objectname);
    var constructedobject = '';
    if(isFactoryName(objectname)){
      constructedobject = getFactory(normalizedName);
    }else if(isServiceName(objectname)){
      constructedobject = getFactory(normalizedName).$get;
    }else{
      initObjectFromInjector(normalizedName, function(arguments){
        constructedobject = getFactory(normalizedName).$get.apply(undefined, arguments); 
      });
    }

    onInstantiated(constructedobject, objectname);
  }


  function orderObject(dependencies, hash){
    var instances = [];
    for(var i = 0; i < dependencies.length; i++){
      instances[i] = hash[dependencies[i]]; 
    }
    return instances;
  }


  object.dependencies = function(objectname){
    var factoryname = normalize(objectname);
    var factory = getFactory(factoryname).$get;
    return argumentList(factory);
  }

  function argumentList(func){
    var s = stripWhiteSpace(func.toString());
    var args;
    var match = s.match(/\((.*?)\)/);
    if(match){
      var args = match[1];
    }else{
      console.log(func);
      throw new Error('unable to decipher args ' + s);
    }
    return args ? args.split(',') : [];
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


  object.constant = function(name, originalvalue){
    var factory = function(){
      var object = {};
      object.val = originalvalue;

      object.$set = function(_val){
        object.val = _val; 
      }
      object.$get = function(){
        return object.val;  
      }
      return object;
    }
    object.register(name, factory);
  }
  object.normalize = normalize;
  object.argumentList = argumentList;
  return object;
}

module.exports = Injector;
