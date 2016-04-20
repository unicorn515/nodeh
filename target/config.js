'use strict';

module.exports = function (set, get, has) {
  set('web.port', 3000);
  //set('db.mongodb','mongodb://127.0.0.1/db1');
  set('web.session.secret', 'test');
};