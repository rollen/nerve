function Fixtures(fs, path){
	var self = this
	self.readFile = function(relaive_folder_path, filename, onFileRead){
		var filepath = path.join(self.folderPath, relaive_folder_path, filename);
		fs.readFile(filepath, 'utf8', onFileRead);
	}

	self.folderPath = path.join(__dirname);
}

module.exports = Fixtures
