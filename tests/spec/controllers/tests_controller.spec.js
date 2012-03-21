require('./../../spec_helper');

describe("TestsController", function(){
  beforeEach(function(){
    this.filesystem = new SyncFS(require('fs'));
    this.request = new Request();
    this.response = new Response();
    this.fixtures = new Fixtures(this.filesystem, fixturesFolderPath);
    this.testsController = new TestsController(this.request, this.response, this.filesystem, this.fixtures.filepath('runner.html', 'html'));
  });

  describe("index", function(){
    it("should write the angular scenario runner file to the http response", function(){
      this.testsController.index();
      expect(this.response._body).toBe(Fixtures.file("runner.html", "html"));
    });
  });
});
