Fixtures = function(filesystem, fixturesFolderPath){
  this.fixturesFolderPath = fixturesFolderPath;
  this.filesystem = filesystem;
}

Fixtures.prototype.file = function(filename, directory){
  return this.filesystem.readFileSync([this.fixturesFolderPath, directory, filename].join('/'), 'utf8');
}

Fixtures.prototype.filepath = function(filename, directory){
  return [this.fixturesFolderPath, directory, filename].join('/');
}

Fixtures.file = function(filename, directory){
  var filesystem = new SyncFS(require('fs'));
  return new Fixtures(filesystem, fixturesFolderPath).file(filename, directory);
}
