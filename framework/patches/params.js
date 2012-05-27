function Params(params, done){
  params.all(function(extractedparams){
    done(extractedparams);
  });
}

module.exports = Params;

