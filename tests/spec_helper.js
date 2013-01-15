exports.nervex = require('./../nervecenter');

require('./fixtures/fixtures');

require('./stubs');

fixturesFolderPath = __dirname + '/fixtures'

project_root = __dirname + '/..'

function Fixtures(){
	this.readFile = function(relaive_folder_path, filename, onFileRead){
		var fs = require('fs');	
		var path = require('path');
		var filepath = path.join(fixturesFolderPath, relaive_folder_path, filename);
		fs.readFile(filepath, 'utf8', onFileRead);
	}
}

$fixtures = new Fixtures();

require('./lib/browser.js');

//patch jasmine-node to have context

context = describe

Given = function(msg, callback){
  describe("Given " + msg, callback);
}

When = function(msg, callback){
  describe("When " + msg, callback);
}

Then = function(msg, callback){
  it("Then " + msg, callback);
}

Feature = function(msg, callback){
  describe("Feature " + msg, callback);
}

AnyFunction = jasmine.any(Function);
