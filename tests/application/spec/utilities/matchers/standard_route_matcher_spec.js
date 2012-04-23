describe('StandardRouteMatcher', function(){
  var system_under_test;

  describe('.hasAMatchFor', function(){
    it('should not match a post a get request', function(){
      system_under_test = StandardRouteMatcher('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home', 'POST')).not.toBeTruthy();
    });

    it('should return success for exact match', function(){
      system_under_test = StandardRouteMatcher('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/home', 'GET')).toBeTruthy();
    });

    it('should return failure for a no mactch found case', function(){
      system_under_test = StandardRouteMatcher('/home', 'GET');
      expect(system_under_test.hasAMatchFor('/homee', 'GET')).toBeFalsy();
    });

    it('should perform a template match', function(){
      system_under_test = StandardRouteMatcher('/home/:id', 'GET');
      expect(system_under_test.hasAMatchFor('/home/12', 'GET')).toBeTruthy();
    });

    it('should perform a root match', function(){
      system_under_test = StandardRouteMatcher('/', 'GET');
      expect(system_under_test.hasAMatchFor('/', 'GET')).toBeTruthy();
    });

    it('should return failure for a path having more components than a template', function(){
      system_under_test = StandardRouteMatcher('/tests', 'GET');
      expect(system_under_test.hasAMatchFor('/angular/angular-scenario.js', 'GET')).toBeFalsy();
    });
  });
});
