function Router($router){
  $router.get('/', 'HelloWorldController', 'index');
	$router.get('/index', 'HelloWorldController', 'index');
}

module.exports = Router;
