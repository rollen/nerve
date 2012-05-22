var nerve = require('./../spec_helper').nervex.nerve;

describe('missing_page.spec', function(){
  var browser,
  response;

  describe ("Given I'm any user", function(){
    beforeEach(function(){
      browser = Browser(nerve);
    });

    describe("When I visit a page that does not exist", function(){
      beforeEach(function(){
        response = browser.visit('/awesomepage');
      });

      describe("Then I should see the nervecenter 404 page", function(){
        it('should see the nervecenter 404 page', function(){
          expect(response._head).toBe(404);
        });
      });
    });
  });
});
