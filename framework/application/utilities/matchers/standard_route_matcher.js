StandardRouteMatcher = function(template, httpVerb){
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

  object.ROOT = '/';

  var hasAMatchFor = function(path, method) {
    var templateComponents = template.split('/');
    var pathComponents = path.split('/');
    
    if(path !== object.ROOT && pathComponents[pathComponents.length - 1] === ''){
      pathComponents.pop();
    }
    return (hasMatchingHttpMethod(method) && 
            similarNumberOfComponents(pathComponents, templateComponents) &&
            hasMatchingPathComponents(pathComponents, templateComponents))
  }

  object.hasAMatchFor = hasAMatchFor;

  return object;
}
