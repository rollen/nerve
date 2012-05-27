require('./../../spec_helper.js');

describe('HttpUrlParamsExtractor', function(){
  describe('.extract', function(){
    it('should extract the params based on the standard template', function(){
      var template = '/jobs/:id';
      var system_under_test = HttpUrlParamsExtractor(template); 
      var expected_hash_string = '{"id":"42"}'
      var urlstring = '/jobs/42';

      expect(JSON.stringify(system_under_test.extract(urlstring))).toBe(expected_hash_string);
    });

    it('should return empty if just given a slash', function(){
      var template = '/';
      var system_under_test = HttpUrlParamsExtractor(template); 
      var expected_hash_string = '{}'
      var urlstring = '/';

      expect(JSON.stringify(system_under_test.extract(urlstring))).toBe(expected_hash_string);
    })

    it('should throw an error if the urlstring is invalid', function(){
      var template = '/jobs/:id';
      var system_under_test = HttpUrlParamsExtractor(template); 
      var expected_hash_string = '{}'
      var urlstring = '/user/:id';

      expect(function(){system_under_test.extract(urlstring)}).toThrow(new Error('Invalid pathstring /user/:id to match template /jobs/:id template part "jobs" did not match urlpart "user"'));
    });

    it('should get params based on url options', function(){
      var template = '/job/:id';
      var system_under_test = HttpUrlParamsExtractor(template); 
      var urlstring = '/job/24?name=rollen&age=26';
      var expected_hash_string = '{"id":"24","name":"rollen","age":"26"}'

      expect(JSON.stringify(system_under_test.extract(urlstring))).toBe(expected_hash_string);
    });
  });
});
