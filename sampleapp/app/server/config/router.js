function Router($router){
  $router.get('/', 'HelloWorldController', 'index');
}

module.exports = Router;
