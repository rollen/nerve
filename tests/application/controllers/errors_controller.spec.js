var nervex = require("./../../spec_helper").nervex;
require('./../../spec_helper');

describe('ErrorsController', function(){
  var request,
  response,
  inject,
  injector,
  errorsControllerService,
  errorsController;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  describe('index', function(){
    beforeEach(function(){
      inject(function($errorsControllerService){
        request = null;
        response = Response();
        spyOn(response, "end");
        errorsControllerService = $errorsControllerService;
        errorsController = errorsControllerService(request, response);
      })();
    });

    it("should write 404 to the response's head", function(){
      errorsController.index();
      expect(response._head).toMatch('404');
      expect(response.end).toHaveBeenCalled();
    });
  });
});
