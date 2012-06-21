var nerve = require('./../spec_helper').nervex.nerve;

xdescribe ("database.spec.js", function(){
  Given("A Postgres database Connector", function(){
    var injector,
    postgres;

    When("provided with credentials", function(){
      beforeEach(function(){
        injector = nerve().bootstrap();
        injector.config(function($pg){
          $pg.connectionString("tcp://postgres:1234@localhost/postgres"); 
        });
      });

      Then("it should connect to the database", function(){
        var connection = function() { injector.inject(function($pg){ postgres = $pg }) };
        expect(connection).not.toThrow(new Error());
      });
    });
  });
});

