'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//import vld from 'validator';

module.exports = function (done) {
  $.method('getmol').register(_asyncToGenerator(function* () {
    return $.model.mo.find({}, {
      mono: 1
    });
  }));
  $.method('getmtl').register(_asyncToGenerator(function* () {
    return $.model.mt.find({}, {
      mtno: 1
    });
  }));
  $.method('getmoind').register((() => {
    var ref = _asyncToGenerator(function* (p) {
      const ret = $.model.mo.find({});
      ret.skip(p);
      ret.limit(1);
      return ret;
    });

    return function (_x) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('getmtind').register((() => {
    var ref = _asyncToGenerator(function* (p) {
      const ret = $.model.mt.find({});
      ret.skip(p);
      ret.limit(1);
      return ret;
    });

    return function (_x2) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('gtmt').register((() => {
    var ref = _asyncToGenerator(function* (p) {
      p.tags = { $all: p.tags };
      return $.model.mt.findOne(p);
    });

    return function (_x3) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('delmt').register((() => {
    var ref = _asyncToGenerator(function* (p) {
      return $.model.mt.remove({ _id: p._id });
    });

    return function (_x4) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('addrep').register((() => {
    var ref = _asyncToGenerator(function* (p) {
      var z = yield $.model.mo.findOne({ mono: p.mono });
      p.rep = z.rep.concat(p.rep);
      return $.model.mo.update({ mono: p.mono }, { $set: p });
    });

    return function (_x5) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('getrep').register((() => {
    var ref = _asyncToGenerator(function* (q) {
      var z = yield $.model.mt.findOne({ mtno: q.p }, { moid: 1 }).populate('moid', 'rep mono');
      return z.moid; //
    });

    return function (_x6) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('setusr').register((() => {
    var ref = _asyncToGenerator(function* (params) {
      const update = { havem: 1 };
      return $.model.user.update({ userno: params }, { $set: update });
    });

    return function (_x7) {
      return ref.apply(this, arguments);
    };
  })());
  $.method('resetusr').register((() => {
    var ref = _asyncToGenerator(function* (params) {
      const update = { havem: 0 };
      return $.model.user.update({ userno: params }, { $set: update });
    });

    return function (_x8) {
      return ref.apply(this, arguments);
    };
  })());
  done();
};