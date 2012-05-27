SyncFS = function(fs){
  this.fs = fs;
}

SyncFS.prototype.readFile = function(path, encoding_, callback){
  var buffer = this.fs.readFileSync(path, encoding_)
  var callback = arguments[arguments.length -1];
  if(typeof(callback) === 'function'){
    callback(null, buffer);
  }
}

SyncFS.prototype.readFileSync = function(path, encoding_){
  return this.fs.readFileSync(path, encoding_);
}

