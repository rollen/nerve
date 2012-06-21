var nerve = require('./../spec_helper').nervex.nerve;

describe ("database.spec.js", function(){
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
        var connection = function() { 
          injector.invoke(function($pg){ 
            console.log($pg);
            postgres = $pg 
          });
        };
        expect(connection).toThrow(new Error());
        expect(postgres).toBeDefined();

        var init = function() { postgres.connect() }
        expect(init).toThrow(new Error());
      });
    });
  });
});

