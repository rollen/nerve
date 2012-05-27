function Params(request, router, httpUrlParamsExtractorService, json, postDataService){
  var object = {};
  
  object.postparams = function(onParamsParsed){
    var postData = postDataService(json, '');

    request.setEncoding('utf8');
    request.on('data', postData.accept);
    request.on('end', function(){
      onParamsParsed(postData.json());          
    });
  }

  object.urlparams = function(){
    var template = router.template(request.url, request.method);
    return httpUrlParamsExtractorService(template).extract(request.url);
  }

  object.all = function(onParamsParsed){
    var urlparams = object.urlparams();
    object.postparams(function(postparams){
      onParamsParsed(httpUrlParamsExtractorService().combinehashes(urlparams, postparams));
    });
  }

  return object;
}

module.exports = Params;
