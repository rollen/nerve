describe('RegexRouteMatcher', function(){
  var system_under_test;

  describe('.hasAMatchFor', function(){
    it('should match based on a regex', function(){
      system_under_test = RegexRouteMatcher(/^\/partials/);
      expect(system_under_test.hasAMatchFor('/partials/jobs/create_job.html')).toBeTruthy();
    });
  });
});
