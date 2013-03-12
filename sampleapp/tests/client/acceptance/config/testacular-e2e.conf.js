basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'e2e/**/*.js'
];

runnerPort = 9101

autoWatch = false;

browsers = ['Chrome'];


proxies = {
  '/': 'http://localhost:8888/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};


