function Router($router){
  $router.get('/index', 'HelloWorldController', 'index');
}

module.exports = Router;
