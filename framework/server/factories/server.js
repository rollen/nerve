var PostData = require('./../post_data');

function Server(request, response, application){
  console.log('attempting to route to ' + request.url + ' with method ' + request.method);
  request.setEncoding('utf8');
  var postdata = PostData(JSON, '');
  request.on('data', postdata.accept);

  request.on('end', function(){
    application.executeRequest(postdata.json());
  });
}

module.exports = Server;
