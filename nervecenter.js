fs = require('fs');

require('./framework/router');
require('./framework/http_route');
require('./framework/utilities/http_response_writer');
require('./framework/controllers/tests_controller');
require('./framework/controllers/errors_controller');
require('./framework/controllers/assets_controller');

require('./framework/factories/nervebuilder');
Nervebuilder.root = __dirname;
require('./framework/factories/controllers');
require('./framework/factories/http_file_responder_writer');

require('./framework/factories/tests_controller');
require('./framework/factories/assets_controller');
require('./framework/factories/http_route_factory');
require('./framework/factories/router');
require('./framework/factories/application');

require('./framework/config/nervebuilder');

require('./framework/application');


