function Router($router){
  $router.assets(/^\/assets/, 'AssetsController', 'show');
  $router.assets(/^\/tests/, 'AssetsController', 'show');
}
module.exports = Router;
