function Template($appConfig){
	return function(relative_path){
		if($appConfig.templatefolder_path == null){
			throw new Error('Template Directory has not been set');	
		}
	}
}
module.exports = Template;

