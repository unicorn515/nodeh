'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (done) {
  $.router.get('/n', function (req, res, next) {
    res.sendFile(_path2.default.resolve(__dirname, '../../doc/pre.html'));
  });
  $.router.get('/m', function (req, res, next) {
    res.sendFile(_path2.default.resolve(__dirname, '../../doc/m.html'));
  });
  $.router.get('/end', function (req, res, next) {
    res.sendFile(_path2.default.resolve(__dirname, '../../doc/end.html'));
  });
  $.router.get('/txt', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.sendFile(_path2.default.resolve(__dirname, '../../doc/m.txt'));
  });
  $.router.get('/apk', function (req, res, next) {
    res.sendFile(_path2.default.resolve(__dirname, '../../doc/m.apk'));
  });

  done();
};