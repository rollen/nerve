/*global module */

function Router($router) {
	'use strict';

	$router.get('/index', 'HelloWorldController', 'index');
	$router.get('/', 'HelloWorldController', 'index');

	$router.assets(/^\/assets/, 'AssetsController', 'show');
}

module.exports = Router;
