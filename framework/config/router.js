function Router($router){
  $router.assets(/^\/assets/, 'AssetsController', 'show');
  $router.post('/tests', 'TestsController', 'create');
}
module.exports = Router;
