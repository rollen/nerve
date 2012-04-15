describe('PostData', function(){
  beforeEach(function(){
    this.data = '{"title":"Job","description":"Description"}'
  });
  describe('.accept', function(){
    it('should keep appending data', function(){
      this.postdata = new PostData(null);
      expect(this.postdata.accept(this.data)).toBe(this.data);
      expect(this.postdata.accept(this.data)).toBe(this.data + this.data);
    });
  });

  describe('.json', function(){
    it('should return empty accepted/cached data as json', function(){
      spyOn(JSON, 'parse');
      this.postdata = new PostData(JSON);
      this.postdata.json();
      expect(JSON.parse).toHaveBeenCalledWith('{}');
    });

    it('should return a json feed based on accpet', function(){
      spyOn(JSON, 'parse');
      this.postdata = new PostData(JSON, this.data);
      this.postdata.json();
      expect(JSON.parse).toHaveBeenCalledWith(this.data);
    });
  });
});
