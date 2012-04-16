require('./../spec_helper');

describe('post.spec.js', function(){
  describe ("Given I have an application with a controller that receives a post request", function(){
    var response, browser;

    beforeEach(function(){
      browser = Browser(Nervebuilder);
    });

    describe("When I send a post request to the controllers endpoint", function(){
      beforeEach(function(){
        response = browser.post('/tests', {"name":"rollen"});
      });

      describe("Then the response should be the params of the post", function(){
        context("response", function(){
          it('should have the json contents', function(){
            expect(response._body).toBe('{"name":"rollen"}');
          });
        });
      });
    });
  });
});
