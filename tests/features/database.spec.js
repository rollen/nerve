var nerve = require('./../spec_helper').nervex.nerve;

describe ("database.spec.js", function(){
  Given("A Postgres database Connector", function(){
    var injector,
    postgres;

    When("provided with credentials", function(){
      beforeEach(function(){
        injector = nerve().bootstrap();
        injector.config(function($pg){
          $pg.connectionString("tcp://localhost/buildio"); 
        });
      });

      Then("it should connect to the database", function(){
        runs(function(){
          injector.invoke(function($pg){
            expect($pg).toBeDefined();
            $pg.end();
          });
          waits(10);
        });
      });
    });
  });
});

