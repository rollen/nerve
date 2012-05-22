function Router($router){
  $router.assets(/^\/assets/, 'AssetsController', 'show');
  $router.post('/tests', 'TestController', 'create');
}
module.exports = Router;
