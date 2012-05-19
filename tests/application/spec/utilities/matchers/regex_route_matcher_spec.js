describe('RegexRouteMatcher', function(){
  var regexRouteMatcher;

  describe('.hasAMatchFor', function(){
    beforeEach(function(){
      inject(function($regexRouteMatcher){
        regexRouteMatcher = $regexRouteMatcher;
      });
    });

    it('should match based on a regex', function(){
      system_under_test = RegexRouteMatcher(/^\/partials/);
      expect(system_under_test.hasAMatchFor('/partials/jobs/create_job.html')).toBeTruthy();
    });
  });
});
