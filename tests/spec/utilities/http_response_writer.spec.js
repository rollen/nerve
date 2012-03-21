require('./../../spec_helper');

describe('HttpFileResponseWriter', function(){
  beforeEach(function(){
    this.request = null;
    this.response = new Response();
    this.filesystem = new SyncFS(require('fs'));
    this.folderpath = [Nervebuilder.config['paths']['viewsFolder'], 'tests'].join('/');
    this.filename = 'runner.html';
    this.httpFileResponseWriter = new HttpFileResponseWriter(this.response, this.filesystem, this.folderpath, this.filename);
  });

  describe('writeToResponse', function(){
    it('should output the response into the response', function(){
      this.httpFileResponseWriter.writeToResponse();
      expect(this.response._body).toBe(Fixtures.file(this.filename, 'html'));
    });
  });
});
