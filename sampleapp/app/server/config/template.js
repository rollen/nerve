function AppConfig($appConfig, $path){
	$appConfig.set('templatefolder_path', $path.$get().join(__dirname, '../views/templates'));
}

module.exports = AppConfig;
