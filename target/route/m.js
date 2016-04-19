'use strict';

var _ap = require('../sd/ap');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {
	$.router.post('/api/s1', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
			const user = yield $.method('getuser').call({ userno: req.body.userno });
			if (user.havem && user.havem !== 0) res.apiSuccess({ para: 33 });else {
				var mt, nt;
				const u1 = yield $.method('getmtl').call();
				const u2 = yield $.method('getmol').call();
				mt = u1.map(function (e) {
					return e.mtno;
				});
				nt = u2.map(function (e) {
					return e.mono;
				});
				res.apiSuccess({ para: 11, mt: mt, nt: nt });
			}
		});

		return function (_x, _x2, _x3) {
			return ref.apply(this, arguments);
		};
	})());

	$.router.post('/api/s2', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
			if (parseInt(req.body.pn) === 0) {
				//得到sn所在的会场，取tid暂存至数组,取cuno
				const mo = yield $.method('getmtind').call(parseInt(req.body.sn));
				const iter = mo[0].tags;
				const cn = mo[0].cuno;
				const usr = req.body.user;
				const txt = req.body.txt;
				//每tid拼装cuno，user循环api
				for (var i in iter) {
					var q2 = {};
					q2.tid = iter[i];
					q2.owner = cn;
					q2.members = usr.split('_').map(function (v) {
						return v.trim();
					}).filter(function (v) {
						return v;
					});
					q2.msg = 'he';
					const v1 = yield (0, _ap.jmt)(q2);
				}
				//置db的user为1
				yield $.method('setusr').call(usr);
			} else {
				//得到sn所在的模板
				const mo = yield $.method('getmoind').call(parseInt(req.body.sn));
				//模板内容数组暂存
				const iter = mo[0].tags;
				const moid = mo[0]._id;
				const usr = req.body.user;
				const txt = req.body.txt;
				var q1 = {};
				var tmptags = [];
				//q1的no取text cuno取user
				q1.mtno = txt;
				q1.cuno = usr;
				q1.moid = moid;
				//按模板内容数组+user制作q2循化api，返回tid暂存至数组
				for (var i in iter) {
					var q2 = {};
					q2.tname = iter[i] + '    发起者:' + usr;
					q2.owner = usr;
					q2.msg = 'he';
					const v1 = yield (0, _ap.cmt)(q2);
					tmptags.push(v1.tid);
				}
				q1.tags = tmptags;
				//写mt记录
				yield $.method('restmt').call(q1);
				//置db的user为1
				yield $.method('setusr').call(usr);
			}
			res.apiSuccess('ye');
		});

		return function (_x4, _x5, _x6) {
			return ref.apply(this, arguments);
		};
	})());

	$.router.post('/api/s3', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			//因为所有tid里用户相同，所以用同一套teammember
			console.log(req.body);
			var q1 = {};
			var q2 = {};
			var usr = req.body.uid;
			var tlist = req.body.tn.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			var mlist = req.body.tm.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			q1.tags = tlist;
			var v1 = yield $.method('gtmt').call(q1);
			q2.owner = v1.cuno;
			if (v1.cuno === usr) {
				var cons = yield $.method('delmt').call(v1);
				for (var i = 0; i < mlist.length; i++) {
					yield $.method('resetusr').call(mlist[i]);
				}
				for (var i = 0; i < tlist.length; i++) {
					q2.tid = tlist[i];
					yield (0, _ap.dism)(q2);
				}
			} else {
				q2.member = usr;
				yield $.method('resetusr').call(usr);
				for (var i = 0; i < tlist.length; i++) {
					q2.tid = tlist[i];
					yield (0, _ap.leam)(q2);
				}
			}
			res.apiSuccess('ye');
		});

		return function (_x7, _x8, _x9) {
			return ref.apply(this, arguments);
		};
	})());
	done();
};