'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {

  const schema = _mongoose2.default.Schema;
  const ObjectId = schema.ObjectId;

  const user = new schema({
    userno: { type: String, index: true },
    havem: { type: Number }
  });
  $.mongodb.model('user', user);
  $.model.user = $.mongodb.model('user');

  const mt = new schema({
    mtno: { type: String, index: true },
    cuno: { type: String, index: true },
    pass: { type: String },
    tags: [{ type: String, index: true }],
    moid: { type: ObjectId, ref: 'mo' }
  });
  $.mongodb.model('mt', mt);
  $.model.mt = $.mongodb.model('mt');

  const mo = new schema({
    mono: { type: String, index: true },
    tags: [{ type: String }],
    rep: [{ type: String, index: true }]
  });
  $.mongodb.model('mo', mo);
  $.model.mo = $.mongodb.model('mo');

  done();
};