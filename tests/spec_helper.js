exports.nervex = require('./../framework/nervecenter');

require('./lib/browser.js');
require('./stubs');


project_root = __dirname + '/..'

function Fixtures(fs, path){
	var self = this
	self.readFile = function(relaive_folder_path, filename, onFileRead){
		var filepath = path.join(self.folderPath, relaive_folder_path, filename);
		fs.readFile(filepath, 'utf8', onFileRead);
	}

	self.folderPath = path.join(__dirname, 'fixtures');
}

exports.fixtures = new Fixtures(require('fs'), require('path'));


//patch jasmine-node to have context

context = describe

AnyFunction = jasmine.any(Function);
