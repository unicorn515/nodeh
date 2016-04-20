'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } } //��static

module.exports = function (done) {
  const app = (0, _express2.default)();
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  const router = _express2.default.Router();

  const routerwrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerwrap[method] = function (path) {
      for (var _len = arguments.length, fnList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fnList[_key - 1] = arguments[_key];
      }

      fnList = fnList.map(fn => {
        return function (req, res, next) {
          const ret = fn(req, res, next);
          if (ret && ret.catch) ret.catch(next);
        };
      });
      router[method].apply(router, [path].concat(_toConsumableArray(fnList)));
    };
  });
  $.router = routerwrap;

  app.use(function (req, res, next) {
    res.apiSuccess = function (data) {
      res.json({ success: true, result: data });
    };
    next();
  });
  app.use(router);
  app.use(_express2.default.static(_path2.default.resolve(__dirname, '../../doc')));
  app.use('/api', function (err, req, res, next) {
    res.json({ error: err.toString() });
  });
  app.listen($.config.get('web.port'), err => {
    done(err);
  });
};