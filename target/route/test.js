'use strict';

var _ap = require('../sd/ap');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {
	$.router.post('/api/rest/mo', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			if ('tags' in req.body) {
				req.body.tags = req.body.tags.split('_').map(function (v) {
					return v.trim();
				}).filter(function (v) {
					return v;
				});
			}
			if ('rep' in req.body) req.body.rep = req.body.rep.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});else req.body.rep = [];
			const mo = yield $.method('restm').call(req.body);
			res.apiSuccess({ mo });
		});

		return function (_x, _x2, _x3) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/u', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			const mo = yield $.method('restu').call(req.body);
			res.apiSuccess({ mo });
		});

		return function (_x4, _x5, _x6) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.get('/api/rest/t', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			const mo = yield $.method('getmtl').call();
			res.apiSuccess({ mo });
		});

		return function (_x7, _x8, _x9) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/t', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			req.body.accids = req.body.accids.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			const v1 = yield (0, _ap.uget)(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x10, _x11, _x12) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/sd/addu', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			const v1 = yield (0, _ap.usign)(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x13, _x14, _x15) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/sd/addm', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			const v1 = yield (0, _ap.cmt)(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x16, _x17, _x18) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/sd/ghis', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			const v1 = yield (0, _ap.ghis)(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x19, _x20, _x21) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/gtmt', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			req.body.tags = req.body.tags.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			const d = yield $.method('gtmt').call(req.body);
			var q1 = {};
			var v1 = {};
			var msgs = {};
			var ls = req.body.tags;
			q1.accid = d.cuno;
			v1.mtno = d.mtno;
			for (var i = 0; i < ls.length; i++) {
				q1.tid = ls[i];
				var j = yield (0, _ap.ghis)(q1);
				msgs[ls[i]] = j.msgs;
			}
			v1.msgs = msgs;
			res.apiSuccess({ v1 });
		});

		return function (_x22, _x23, _x24) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/addrep', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			req.body.rep = req.body.rep.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			const v1 = yield $.method('addrep').call(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x25, _x26, _x27) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/addtag', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			req.body.tags = req.body.tags.split('_').map(function (v) {
				return v.trim();
			}).filter(function (v) {
				return v;
			});
			const v1 = yield $.method('addtag').call(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x28, _x29, _x30) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.post('/api/rest/rep', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			var v1 = yield $.method('getrep').call(req.body);
			res.apiSuccess({ v1 });
		});

		return function (_x31, _x32, _x33) {
			return ref.apply(this, arguments);
		};
	})());
	$.router.get('/session', (() => {
		var ref = _asyncToGenerator(function* (req, res, next) {
			var msgs = req.session.ss;
			var teamlist = req.session.tl;
			//res.json(msgs);
			var str = '<h1>list is</h1>';
			var tmpa = [];
			for (var i = 0; i < teamlist.length; i++) {
				var user = teamlist[i];
				tmpa = msgs[user];
				for (var j = 0; j < tmpa.length; j++) {
					if (tmpa[j].type === 0) str = str + tmpa[j].from + ' @' + tmpa[j].sendtime + ' ' + tmpa[j].body.msg + '</br>';
				}
			}
			res.end(str);
		});

		return function (_x34, _x35, _x36) {
			return ref.apply(this, arguments);
		};
	})());
	done();
};