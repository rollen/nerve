describe('Nervebuilder.createRouter', function(){
  var router;
  it('returns a non null object', function(){
    router = Nervebuilder.createRouter(null, null, null);
    expect(router).not.toBe(null);
  });
});
