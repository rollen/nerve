exports.nervex = require('./../framework/nervecenter');

require('./lib/browser.js');
require('./stubs');

function createFixturesApi(){
	var path = require('path')
		, fs = require('fs')
		, Fixtures = require('./fixtures')

	return new Fixtures(fs, path);
}
exports.fixtures = createFixturesApi()



project_root = __dirname + '/..'

context = describe

AnyFunction = jasmine.any(Function);
