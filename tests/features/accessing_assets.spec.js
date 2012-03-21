require('./../spec_helper');

describe ("Given I'm any user", function(){
  beforeEach(function(){
    this.browser = new Browser();
  });

  describe("When I visit a page that does not exist", function(){
    beforeEach(function(){
      this.response = this.browser.visit('/assets/angular-scenario.js');
    });

    describe('Then I should see the file specified by the asset', function(){
      it('Then I should see the file specified by the asset', function(){
        expect(this.browser.response._head).not.toBe(404);
        expect(this.browser.response._body).toBe(Fixtures.file("angular-scenario.js", 'javascript'));
      });
    });
  });
});
