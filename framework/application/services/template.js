function Template($appConfig, fs, httpFileResponseWriter, fileInfoService){
	return function(relative_path, onFileReadComplete){
		if($appConfig('templatefolder_path') == undefined){
			throw new Error('Template Directory has not been set');	
		} else {
			var fileInfo = fileInfoService($appConfig('templatefolder_path'), relative_path);
			httpFileResponseWriter.writeToResponse(fileInfo, onFileReadComplete);
		}
	}
}
module.exports = Template;
