function HttpUrlParamsExtractor(template){
  var object = {};

  function parsePath(pathstring){
    var hash = {};
    var pathstringparts = pathstring.split('/');
    var templateparts = template.split('/');
    for(var i = 0; i < templateparts.length ; i++){
      if(templateparts[i][0]==':'){
        hash[templateparts[i].slice(1,templateparts[i].length)] = pathstringparts[i];
      }else if(templateparts[i] !== pathstringparts[i]){
        throw 'Invalid pathstring ' + pathstring + ' to match template ' + template 
        + ' template part "' + templateparts[i]
        + '" did not match urlpart "' + pathstringparts[i] + '"';
      }
    }
    return hash;
  }

  function parseOptions(paramsstring){
    var paramshash = {};
    var args = paramsstring.split("&");
    for(var i = 0; i < args.length; i++){
      paramshash[args[i].split('=')[0]] = args[i].split('=')[1];
    }
    return paramshash
  }

  function combinehashes(firsthash, secondhash){
    var copy = function(destination, source) {
      for (var property in source) {
        if (source.hasOwnProperty(property)) {
          destination[property] = source[property];
        }
      }
      return destination;
    };

    var newhash = {};
    copy(newhash, firsthash);
    copy(newhash, secondhash);
    return newhash;
  }

  object.extract = function(urlstring){
    var regex = /(.+)\?(.+)/;
    var match = regex.exec(urlstring);
    var pathhash = {}; 
    var paramshash = {}; 

    if(match){
      pathhash = parsePath(match[1]);
      paramshash = parseOptions(match[2]);
    } else {
      pathhash =  parsePath(urlstring);
      paramshash = parseOptions(urlstring);
    }

    return combinehashes(pathhash, paramshash);
  }
  object.combinehashes = combinehashes;
  return object;
}

module.exports = HttpUrlParamsExtractor;

