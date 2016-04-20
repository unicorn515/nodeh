'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {
  //const conn=mong.createConnection($.config.get('db.mongodb'));
  const conn = _mongoose2.default.createConnection(process.env.MONGODB_CONNECTION);
  $.mongodb = conn;
  $.model = {};
  const ObjectId = _mongoose2.default.Types.ObjectId;
  $.utils.ObjectId = ObjectId;
  done();
};