HttpUrlParamsExtractor = function(template){
  var object = {};
  object.extract = function(urlstring){
    var urlstringparts = urlstring.split('/');
    var templateparts = template.split('/');
    var hash = {};
    for(var i = 0; i < templateparts.length ; i++){
      if(templateparts[i][0]==':'){
        hash[templateparts[i].slice(1,templateparts[i].length)] = urlstringparts[i];
      }else if(templateparts[i] !== urlstringparts[i]){
        throw 'Invalid urlstring ' + urlstring + ' to match template ' + template 
              + ' template part "' + templateparts[i]
              + '" did not match urlpart "' + urlstringparts[i] + '"';
      }
    }
    return hash;
  };
  return object;
}
