require('./../spec_helper');

describe ("Given I'm any user", function(){
  beforeEach(function(){
    this.browser = new Browser();
  });

  describe("When I visit a the angular-scenario page", function(){
    beforeEach(function(){
      this.response = this.browser.visit('/assets/angular-scenario.js');
    });

    describe('Then I should see the file specified by the asset', function(){
      it('Then I should see the file specified by the asset', function(){
        expect(this.response._head).not.toBe(404);
      });
    });
  });

  describe("When I visit a the angular page", function(){
    beforeEach(function(){
      this.response = this.browser.visit('/assets/angular.js');
    });

    describe('Then I should see the file specified by the asset', function(){
      it('Then I should see the file specified by the asset', function(){
        expect(this.response._head).not.toBe(404);
      });
    });
  });
});
