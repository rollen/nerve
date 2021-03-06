var nerve = require('./../spec_helper').nervex.nerve;

describe('post.spec.js', function(){
  describe ("Given I have an application with a controller that receives a post request", function(){
    var response, browser;

    beforeEach(function(){
      browser = Browser(nerve);
    });

    describe("When I send a post request to the controllers endpoint", function(){
      beforeEach(function(){
        response = browser.post('/tests?age=26&syle=ninjitsu', {"name":"rollen"});
      });

      describe("Then the response should be the params of the post", function(){
        context("response", function(){
          it('should have the json contents', function(){
            expect(response._body).toBe('{"age":"26","syle":"ninjitsu","name":"rollen"}');
          });
        });
      });
    });
  });
});
