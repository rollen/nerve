function HelloWorldController(response, $template){
  var object = {};
  object.index = function(){
		$template('helloworld/index.html', function on_file_read_complete(data){
			response.end();
		});
  }
  return object;
}

module.exports = HelloWorldController;
