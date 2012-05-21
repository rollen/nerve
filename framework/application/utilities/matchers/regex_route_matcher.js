function RegexRouteMatcher(regex){
  var object = {}
  object.template = regex;

  var hasAMatchFor = function(pattern){
    return pattern.match(regex) ? true : false
  }
  object.hasAMatchFor = hasAMatchFor;
  return object;
}

module.exports = RegexRouteMatcher;
