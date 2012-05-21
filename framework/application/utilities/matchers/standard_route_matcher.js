function StandardRouteMatcher(_template, httpVerb){
  var object = {}

  var hasMatchingHttpMethod = function(method){
    return httpVerb === method;
  }

  var similarNumberOfComponents = function(pathComponents, templateComponents){
    return templateComponents.length === pathComponents.length;
  }

  var hasMatchingPathComponents = function(pathComponents, templateComponents){
    var isAMatch = true;
    for(var index = 0; index < pathComponents.length; index++){
      if(areNotMatchingComponents(pathComponents[index], templateComponents[index])){
        isAMatch = false;
      } 
    }
    return isAMatch;
  }

  var areNotMatchingComponents= function(pathComponent, templateComponent){
    return templateComponent.charAt(0) !== ":" && templateComponent!== pathComponent;
  }

  var hasTrailingSlash = function(pathComponents){
    return pathComponents[pathComponents.length - 1] ==='';
  }

  var isNotRootPath = function(path){
    return path !== object.ROOT;
  }

  object.ROOT = '/';

  var getPathComponents = function(path){
    var result; 
    var regex = /(.+)\?(.+)/;
    if(regex.exec(path)){
      result = regex.exec(path)[1].split('/');
    }else{
      result = path.split('/');
    }
    return result
  }

  var hasAMatchFor = function(path, method) {
    var templateComponents = _template.split('/');
    var pathComponents = getPathComponents(path);

    if(isNotRootPath(path) && hasTrailingSlash(pathComponents)){
      pathComponents.pop();
    }

    return (hasMatchingHttpMethod(method) && 
            similarNumberOfComponents(pathComponents, templateComponents) &&
            hasMatchingPathComponents(pathComponents, templateComponents))
  }

  function template(){
    return _template;
  }

  object.hasAMatchFor = hasAMatchFor;
  object.template = template;

  return object;
}

module.exports = StandardRouteMatcher;

