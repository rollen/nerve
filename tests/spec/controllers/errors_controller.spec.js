require('./../../spec_helper');

describe('ErrorsController', function(){
  describe('index', function(){
    it("should write 404 to the response's head", function(){
      this.request = null;
      this.response = new Response();
      spyOn(this.response, "end");
      this.errorsController = new ErrorsController(this.request, this.response);
      this.errorsController.index();
      expect(this.response._head).toMatch('404');
      expect(this.response.end).toHaveBeenCalled();
    });
  });
});
