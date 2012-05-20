var nervex = require('./../../nervecenter');

require('./fixtures/fixtures');

require('./stubs');
fixturesFolderPath = __dirname + '/fixtures'

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

inject = function(func){
  return function(){nervex.injector.invoke(func);};
}

injector= function(func){
  func(nervex.injector);
}
