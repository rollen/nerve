function AssetUrlInfo(url){
  var object = {};
  object.filename = function(){
    return url.split('/').pop();
  }

  object.path = function(){
    var segments = url.split('/');
    segments.pop();
    return segments.join('/');
  }

  return object;
}

module.exports = AssetUrlInfo;
