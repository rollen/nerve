PostData = function(json_parser, cache){
  var postdata = {};
  cache = cache || '';
  postdata.accept = function(data){
    cache = cache + data;
    return cache
  }

  postdata.json = function(){
    return cache === '' ? json_parser.parse('{}') : json_parser.parse(cache);
  }
  return postdata;
}

