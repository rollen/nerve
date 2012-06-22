var nervex = require('./../../spec_helper').nervex;

describe('PgConfig', function(){
  var params,
  inject,
  injector;

  beforeEach(function(){
    var _nervex = nervex.nerve();
    _nervex.loadfiles();
    _nervex.patches();
    inject = _nervex.inject;
    injector = _nervex.injector;
  });

  it('requires the postgres lib to be set', function(){
    injector(function($injector){
      $injector.config(function($pg){
        expect($pg.client()).not.toBeDefined();
      });
    });
  });
});
