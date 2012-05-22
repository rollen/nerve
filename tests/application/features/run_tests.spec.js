var nervex = require('./../spec_helper').nervex;

describe ("run_tests.spec.js", function(){
  describe ("Given I'm any user", function(){
    var browser;
    
    beforeEach(function(){
      browser = Browser(nervex);
    });

    describe("When I visit the tests page", function(){
      beforeEach(function(){
        response = browser.visit('/tests');
      });

      describe("Then I should see the angular tests running", function(){
        it("should run the angular tests", function(){
          expect(response._body).toBe(Fixtures.file("runner.html", 'html'));
        });
      });
    });
  });
});
