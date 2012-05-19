require("./../../../spec_helper");

describe('RegexRouteMatcher', function(){
  var regexRouteMatcherFactory;
  beforeEach(function(){
    inject(function($regexRouteMatcherFactory){
      regexRouteMatcherFactory = $regexRouteMatcherFactory;
    });
  });

  describe('.hasAMatchFor', function(){
    it('should match based on a regex', function(){
      system_under_test = regexRouteMatcherFactory(/^\/partials/);
      expect(system_under_test.hasAMatchFor('/partials/jobs/create_job.html')).toBeTruthy();
    });
  });
});
