RegexRouteMatcher = function(regex){
  var object = {}

  var hasAMatchFor = function(pattern){
    return pattern.match(regex) ? true : false
  }
  object.hasAMatchFor = hasAMatchFor;
  return object;
}
