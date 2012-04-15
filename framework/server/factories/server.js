Server = function(request, response, application){
  console.log('attempting to route to ' + request.url);
  request.setEncoding('utf8');
  var postdata = PostData(JSON, '');
  request.on('data', postdata.accept);

  request.on('end', function(){
    application.executeRequest(postdata.json());
  });
}

