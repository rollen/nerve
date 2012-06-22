function Pg(pg, done){
  console.log('hello pg');
  pg.connect(function(err, client){
    if(err){
      throw new Error(err);
    }
    done(client);
  });
}

module.exports = Pg;

