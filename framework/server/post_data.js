PostData = function(json_parser, cache){
  this.cache = cache || '';
  this.json_parser = json_parser;
}

PostData.prototype.accept = function(data){
  this.cache = this.cache + data;
  return this.cache
}

PostData.prototype.json = function(){
  return this.cache === '' ? this.json_parser.parse('{}') : this.json_parser.parse(this.cache);
}
