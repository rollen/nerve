require('./../spec_helper');

describe ("run_tests.spec.js", function(){
  describe ("Given I'm any user", function(){
    beforeEach(function(){
      this.browser = Browser(Nervebuilder);
    });

    describe("When I visit the tests page", function(){
      beforeEach(function(){
        this.response = this.browser.visit('/tests');
      });

      describe("Then I should see the angular tests running", function(){
        it("should run the angular tests", function(){
          expect(this.response._body).toBe(Fixtures.file("runner.html", 'html'));
        });
      });
    });
  });
});
