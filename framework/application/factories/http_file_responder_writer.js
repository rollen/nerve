HttpFileResponseWriterBuilder = function(){}

HttpFileResponseWriterBuilder.build = function(){ 
  var request = new Request();
  var response = new Response();
  var filesystem = new SyncFS(require('fs'));
  var folderpath= [Nervebuilder.config['paths']['viewsFolder'], 'assets' ].join('/');
  var filename = 'runner.html';
  var httpFileResponseWriter = HttpFileResponseWriter(response, filesystem, folderpath, filename);
  return httpFileResponseWriter;
}
