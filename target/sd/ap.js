'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cmt = cmt;
exports.jmt = jmt;
exports.uget = uget;
exports.usign = usign;
exports.dism = dism;
exports.leam = leam;
var sdk = require('./ServerAPI');
var sd = new sdk('c1d92027795778d4c36b673da2559bca', '86b395670420');

function cmt(p) {
	return new Promise((res, rej) => {
		sd.createGroup(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}

function jmt(p) {
	return new Promise((res, rej) => {
		sd.addIntoGroup(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}

function uget(p) {
	return new Promise((res, rej) => {
		sd.getUinfos(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}

function usign(p) {
	return new Promise((res, rej) => {
		sd.createUserId(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}

function dism(p) {
	return new Promise((res, rej) => {
		sd.removeGroup(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}

function leam(p) {
	return new Promise((res, rej) => {
		sd.kickFromGroup(p, function (a, b) {
			if (a) rej(a);else res(b);
		});
	});
}