function Asset(){
	var object = {}

	object.$get = function($httpFileResponseWriter, $appConfig, $path, $fileInfoService){
		var fileInfo;
		return function(relative_filename, onFileWriteComptete){
			fileInfo = $fileInfoService($appConfig('asset_path'), relative_filename);
			$httpFileResponseWriter.writeToResponse(fileInfo, onFileWriteComptete);
		}	
	}
	return object;
}

module.exports = Asset;
