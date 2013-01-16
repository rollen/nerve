function Router($router){
  $router.get('/index', 'HelloWorldController', 'index');
	$router.get('/', 'HelloWorldController', 'index');

  $router.assets(/^\/assets/, 'AssetsController', 'show');
}

module.exports = Router;
