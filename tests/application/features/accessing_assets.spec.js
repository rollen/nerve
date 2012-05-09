require('./../spec_helper');


describe ("accessing_assets.spec.js", function(){
  describe ("Given I'm any user", function(){
    beforeEach(function(){
      this.browser = Browser(Nervebuilder);
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