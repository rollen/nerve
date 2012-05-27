function Folderpath($folderpath){
  $folderpath.$folder('views', $folderpath.$resolve(__dirname, '../application/views/'));
}
module.exports = Folderpath;
