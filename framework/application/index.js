fs = require('fs');

exports.Router = require('./router');
exports.HttpRoute = require('./http_route');
exports.HttpFileResponseWriter = require('./utilities/http_response_writer');
exports.HttpUrlParamsExtractor = require('./utilities/http_url_params_extractor');
exports.TestsController = require('./controllers/tests_controller');
exports.ErrorsController = require('./controllers/errors_controller');
exports.AssetsController = require('./controllers/assets_controller');
exports.Application = require('./application');
exports.StandardRouteMatcher = require('./utilities/matchers/standard_route_matcher');
exports.RegexRouteMatcher = require('./utilities/matchers/regex_route_matcher');
exports.FileInfo = require('./utilities/newables/file_info');

require('./factories/nervebuilder');

Nervebuilder.root = __dirname;
console.log(__dirname);
require('./factories/controllers');
require('./factories/http_file_responder_writer');

require('./factories/tests_controller');
require('./factories/assets_controller');
require('./factories/http_route_factory');
require('./factories/router');
require('./factories/application');

require('./config/nervebuilder');

