require("./../../../spec_helper");

describe('RegexRouteMatcher', function(){
  var regexRouteMatcherService;
  beforeEach(inject(function($regexRouteMatcherService){
    regexRouteMatcherService = $regexRouteMatcherService;
  }));

  describe('.hasAMatchFor', function(){
    it('should match based on a regex', function(){
      system_under_test = regexRouteMatcherService(/^\/partials/);
      expect(system_under_test.hasAMatchFor('/partials/jobs/create_job.html')).toBeTruthy();
    });
  });

  describe('.template', function(){
    it('should return a template', function(){
      system_under_test = regexRouteMatcherService(/^\/partials/);
      expect(system_under_test.template()).toBe('/^\\/partials/');
    });
  });
});
