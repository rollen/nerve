function Path($path){
  var path = $path.$path();

  $path.$folder('views', path.resolve(__dirname, '../application/views/'));
}
module.exports = Path;
