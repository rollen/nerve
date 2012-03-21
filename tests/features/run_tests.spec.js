require('./../spec_helper');

describe ("Given I'm any user", function(){
  beforeEach(function(){
    this.browser = new Browser();
  });

  describe("When I visit the tests page", function(){
    beforeEach(function(){
      this.browser.visit('/tests');
    });

    describe("Then I should see the angular tests running", function(){
      it("should run the angular tests", function(){
        expect(this.browser.response._body).toBe(Fixtures.file("runner.html", 'html'));
      });
    });
  });
});
