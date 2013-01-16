function AppConfig($appConfig, $path){
	$appConfig.set('templatefolder_path', 
			$path.$get().join(__dirname, '../views/templates'));

	$appConfig.push('asset_path', 
			$path.$get().join(__dirname + '../../../client/assets'));
}

module.exports = AppConfig;
