function Pg($pg){
  $pg.client(require('pg'));
}

module.exports = Pg;
