require('./../nervecenter');

require('./fixtures/fixtures');

require('./stubs');
fixturesFolderPath = __dirname + '/fixtures'

require('./lib/browser.js');


//patch jasmine-node to have context

context = describe
