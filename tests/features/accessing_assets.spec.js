var nerve = require('./../spec_helper').nervex.nerve;

describe ("accessing_assets.spec.js", function(){
  var browser,
  response;

  describe ("Given I'm any user", function(){
    beforeEach(function(){
      browser = Browser(nerve);
    });

    describe("When I visit a the angular-scenario page", function(){
      beforeEach(function(){
        response = browser.visit('/assets/angular-scenario.js');
      });

      describe('Then I should see the file specified by the asset', function(){
        it('Then I should see the file specified by the asset', function(){
          expect(response._head).not.toBe(404);
        });
      });
    });

    xdescribe("When I visit a the angular page", function(){
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
});
