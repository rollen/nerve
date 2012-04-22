HttpRoute = function(httpVerb, template, controllerFactory, action, matcher) {
  var httpRoute = {}

  httpRoute.runAction = function(request, response, filesystem){
    return (controllerFactory.build(request, response, filesystem))[action];
  }

  httpRoute.hasAMatchFor = function(path, method) {
    var templateComponents = template.split('/');
    var pathComponents = path.split('/');
    return (httpRoute.hasMatchingHttpMethod(method) && 
            httpRoute.similarNumberOfComponents(pathComponents, templateComponents) &&
            httpRoute.hasMatchingPathComponents(pathComponents, templateComponents))
  }

  httpRoute.hasMatchingHttpMethod = function(method){
    return httpVerb === method;
  }

  httpRoute.similarNumberOfComponents = function(pathComponents, templateComponents){
    return templateComponents.length === pathComponents.length;
  }

  httpRoute.hasMatchingPathComponents = function(pathComponents, templateComponents){
    var isAMatch = true;
    for(var index = 0; index < pathComponents.length; index++){
      if(httpRoute.areNotMatchingComponents(pathComponents[index], templateComponents[index])){
        isAMatch = false;
      } 
    }
    return isAMatch;
  }

  httpRoute.areNotMatchingComponents= function(pathComponent, templateComponent){
    return templateComponent.charAt(0) !== ":" && templateComponent!== pathComponent;
  }

  httpRoute.toString = function(){
    return ['httpVerb: ' + httpVerb, 'template: ' + template].join('  ');
  }

  return httpRoute;
}
