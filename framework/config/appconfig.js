function AppConfig($appConfig, $path){
	$appConfig.set('asset_path', $path.val.join(__dirname + '/../application/views/assets'));
}

module.exports = AppConfig;
