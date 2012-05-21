function AssetUrlInfo(url){
  var object = {};
  object.filename = function(){
    return url.split('/').pop();
  }

  return object;
}

module.exports = AssetUrlInfo;
