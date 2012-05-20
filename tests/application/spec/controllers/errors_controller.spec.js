require('./../../spec_helper');

describe('ErrorsController', function(){
  var request,
  response,
  errorsControllerService,
  errorsController;

  beforeEach(inject(function($errorsControllerService){
    request = null;
    response = Response();
    spyOn(response, "end");
    errorsControllerService = $errorsControllerService;
    errorsController = errorsControllerService(request, response);
  }));

  describe('index', function(){
    it("should write 404 to the response's head", function(){
      errorsController.index();
      expect(response._head).toMatch('404');
      expect(response.end).toHaveBeenCalled();
    });
  });
});
