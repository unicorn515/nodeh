'use strict';

var _projectCore = require('project-core');

var _projectCore2 = _interopRequireDefault(_projectCore);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $ = global.$ = new _projectCore2.default(); //export NODE_ENV=dev &&export DEBUG='my:*' && node target/server.js

$.createdebug = function (name) {
  return (0, _debug2.default)('my:' + name);
};
const debug = $.createdebug('start');
//�Ӻ�����ini�Ķ���
$.init.add(done => {
  $.config.load(_path2.default.resolve(__dirname, 'config.js'));
  done();
});
//���ļ���ini����
$.init.load(_path2.default.resolve(__dirname, 'init', 'mdb.js'));
$.init.load(_path2.default.resolve(__dirname, 'init', 'ex.js'));
$.init.load(_path2.default.resolve(__dirname, 'model'));
$.init.load(_path2.default.resolve(__dirname, 'route'));
$.init.load(_path2.default.resolve(__dirname, 'method'));
$.init(err => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log('envini');
  }
});