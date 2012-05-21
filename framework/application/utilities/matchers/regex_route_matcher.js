function RegexRouteMatcher(regex){
  var object = {}

  function template(){
    return regex.toString();
  }

  var hasAMatchFor = function(pattern){
    return pattern.match(regex) ? true : false
  }


  object.hasAMatchFor = hasAMatchFor;
  object.template = template;
  return object;
}

module.exports = RegexRouteMatcher;
