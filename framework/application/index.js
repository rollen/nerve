fs = require('fs');

nervex = {};
require('./injector');
nervex.injector = Injector();

require('./router');
require('./http_route');
require('./utilities/matchers/standard_route_matcher');
require('./utilities/matchers/regex_route_matcher');

require('./utilities/http_response_writer');
require('./utilities/http_url_params_extractor');
require('./controllers/tests_controller');
require('./controllers/errors_controller');
require('./controllers/assets_controller');

require('./factories/nervebuilder');
Nervebuilder.root = __dirname;
require('./factories/controllers');
require('./factories/http_file_responder_writer');

require('./factories/tests_controller');
require('./factories/assets_controller');
require('./factories/http_route_factory');
require('./factories/router');
require('./factories/application');

require('./config/nervebuilder');

require('./application');

nervex.injector.service(RegexRouteMatcher);
nervex.injector.service(StandardRouteMatcher);
