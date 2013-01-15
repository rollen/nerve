function AssetsController($asset, $request, $response){
  var object = {};

	function extract_filepath(url){
		var p = url.split('/');
		return p.slice(2, p.length).join('/');
	}

  object.show = function(){
		$asset(extract_filepath($request.url), function onFileReadComplete(){
			$response.end();
		});
  }

  return object;
}

module.exports = AssetsController;
