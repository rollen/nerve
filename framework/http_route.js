HttpRoute = function(httpVerb, template, controllerFactory, action) {
  this.httpVerb = httpVerb;
  this.template= template;
  this.controllerFactory = controllerFactory;
  this.action = action;
}

HttpRoute.prototype.runAction = function(request, response, filesystem){
  (this.controllerFactory.build(request, response, filesystem))[this.action]();
}

HttpRoute.prototype.hasAMatchFor = function(path, method) {
  var templateComponents = this.template.split('/');
  var pathComponents = path.split('/');
  return (this.hasMatchingHttpMethod(method) && 
          this.similarNumberOfComponents(pathComponents, templateComponents) &&
          this.hasMatchingPathComponents(pathComponents, templateComponents))
}

HttpRoute.prototype.hasMatchingHttpMethod = function(method){
  return this.httpVerb === method;
}

HttpRoute.prototype.similarNumberOfComponents = function(pathComponents, templateComponents){
  return templateComponents.length === pathComponents.length;
}

HttpRoute.prototype.hasMatchingPathComponents = function(pathComponents, templateComponents){
  var isAMatch = true;
  for(var index = 0; index < pathComponents.length; index++){
    if(this.areNotMatchingComponents(pathComponents[index], templateComponents[index])){
      isAMatch = false;
    } 
  }
  return isAMatch;
}

HttpRoute.prototype.areNotMatchingComponents= function(pathComponent, templateComponent){
  return templateComponent.charAt(0) !== ":" && templateComponent!== pathComponent;
}
