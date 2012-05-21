describe('PostData', function(){
  var data,
  postDataService;

  beforeEach(function(){
    data = '{"title":"Job","description":"Description"}'
    inject(function($postDataService){
      postDataService = $postDataService;
    });
  });
  describe('.accept', function(){
    it('should keep appending data', function(){
      postdata = postDataService(null);
      expect(postdata.accept(data)).toBe(data);
      expect(postdata.accept(data)).toBe(data + data);
    });
  });

  describe('.json', function(){
    it('should return empty accepted/cached data as json', function(){
      spyOn(JSON, 'parse');
      postdata = postDataService(JSON);
      postdata.json();
      expect(JSON.parse).toHaveBeenCalledWith('{}');
    });

    it('should return a json feed based on accpet', function(){
      spyOn(JSON, 'parse');
      postdata = postDataService(JSON, data);
      postdata.json();
      expect(JSON.parse).toHaveBeenCalledWith(data);
    });
  });
});
