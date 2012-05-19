describe('StandardRouteMatcher', function(){
  var standardRouteMatcherFactory;

  describe('.hasAMatchFor', function(){
    beforeEach(function(){
      inject(function($standardRouteMatcherFactory){
        standardRouteMatcherFactory = $standardRouteMatcherFactory;
      });
    });

    it('should not match a post a get request', function(){
      system_under_test = standardRouteMatcherFactory('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home', 'POST')).not.toBeTruthy();
    });

    it('should return success for exact match', function(){
      system_under_test = standardRouteMatcherFactory('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home', 'GET')).toBeTruthy();
    });

    it('should allow for a liberal trailing /', function(){
      system_under_test = standardRouteMatcherFactory('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home/', 'GET')).toBeTruthy();
    });

    it('should ignore standard params in the match', function(){
      system_under_test = standardRouteMatcherFactory('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home?name="superman"', 'GET')).toBeTruthy();
    });

    it('should return failure for a no mactch found case', function(){
      system_under_test = standardRouteMatcherFactory('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/homee', 'GET')).toBeFalsy();
    });

    it('should perform a template match', function(){
      system_under_test = standardRouteMatcherFactory('/home/:id', 'GET');
      expect(system_under_test.hasAMatchFor('/home/12', 'GET')).toBeTruthy();
    });

    it('should perform a root match', function(){
      system_under_test = standardRouteMatcherFactory('/', 'GET');
      expect(system_under_test.hasAMatchFor('/', 'GET')).toBeTruthy();
    });

    it('should return failure for a path having more components than a template', function(){
      system_under_test = standardRouteMatcherFactory('/tests', 'GET');
      expect(system_under_test.hasAMatchFor('/angular/angular-scenario.js', 'GET')).toBeFalsy();
    });

    it('should match a format in a url', function(){
      system_under_test = standardRouteMatcherFactory('/jobs.json', 'GET');
      expect(system_under_test.hasAMatchFor('/jobs.json', 'GET')).toBeTruthy();
      expect(system_under_test.hasAMatchFor('/jobs', 'GET')).not.toBeTruthy();
    });
  });
});
