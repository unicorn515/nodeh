'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//import vld from 'validator';

module.exports = function (done) {
  $.method('restu').register((() => {
    var ref = _asyncToGenerator(function* (params) {
      params.userno = params.userno.toLowerCase();
      {
        const user = yield $.method('getuser').call({ userno: params.userno });
        if (user) throw new Error('user ${params.userno} already exists');
      }
      const user = new $.model.user(params);
      return user.save();
    });

    return function (_x) {
      return ref.apply(this, arguments);
    };
  })());

  $.method('restm').check({
    tags: { validate: v => Array.isArray(v) }
  });
  $.method('restm').register((() => {
    var ref = _asyncToGenerator(function* (params) {
      const mo = new $.model.mo(params);
      return mo.save();
    });

    return function (_x2) {
      return ref.apply(this, arguments);
    };
  })());

  $.method('restmt').check({
    tags: { validate: v => Array.isArray(v) }
  });
  $.method('restmt').register((() => {
    var ref = _asyncToGenerator(function* (params) {
      const mt = new $.model.mt(params);
      return mt.save();
    });

    return function (_x3) {
      return ref.apply(this, arguments);
    };
  })());

  $.method('getuser').register((() => {
    var ref = _asyncToGenerator(function* (params) {

      const query = {};
      if (params._id) {
        query._id = params._id;
      } else if (params.userno) {
        query.userno = params.userno;
      } else {
        throw new Error('missing parameter _id|name|email');
      }

      return $.model.user.findOne(query);
    });

    return function (_x4) {
      return ref.apply(this, arguments);
    };
  })());
  done();
};