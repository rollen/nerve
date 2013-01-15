function AppConfig($appConfig, $path){
	$appConfig.push('asset_path', $path.val.join(__dirname + '/../application/views/assets'));
}

module.exports = AppConfig;
