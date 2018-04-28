/*
 * @Author: yanchaowei@uinnova.com
 * @Date: 2018-04-18 16:49:34
 * @Last Modified by: yanchaowei@uinnova.com
 * @Last Modified time: 2018-04-28 18:00:17
 */
var plan = {};
plan.remote = {
	appName: 'http://192.168.1.164:9998',
	tableName: 'http://192.168.1.102:8081',
	ajaxGet: function (url, params, callback) {
		var token = getCookie('loginToken');
		var ret = null;
		$.ajax({
			type: 'GET',
			async: callback || false,
			contentType: 'application/json;charset=UTF-8',
			headers: { 'Authorization': token, },
			url: url,
			data: params,
			cache: false,
			xhrFields: {
				withCredentials: true,
			},
			crossDomain: true,
			success: function (back) {
				if (back.code === 100002) {
					delCookie('loginName');
					window.location.reload();
				}
				callback ? callback(back) : ret = back;
			},
			dataType: 'json',
			error: function (req, status, ex) {
			},
			timeout: 60000,
		});
		return ret;
	},
	ajaxPost: function (url, params, callback) {
		var token = getCookie('loginToken');
		var ret = null;
		$.ajax({
			type: 'POST',
			async: callback || false,
			contentType: 'application/json;charset=UTF-8',
			cache: false,
			headers: { 'Authorization': token, },
			url: url,
			data: params,
			xhrFields: {
				withCredentials: true,
			},
			crossDomain: true,
			success: function (back) {
				if (back.code === 100002) {
					delCookie('loginName');
					window.location.reload();
				}
				callback ? callback(back) : ret = back;
			},
			dataType: 'json',
			error: function (req, status, ex) {
			},
			timeout: 60000,
		});
		return ret;
	},
	ajaxGet2: function (url, params, callback) {
		var ret = null;
		$.ajax({
			type: 'GET',
			async: callback || false,
			url: url,
			data: params,
			cache: false,
			success: callback || function (back) {
				ret = back;
			},
			dataType: 'json',
			error: function (req, status, ex) {

			},
			timeout: 60000,
		});
		return ret;
	},
	ajaxPost2: function (url, params, callback) {
		var ret = null;
		$.ajax({
			type: 'POST',
			async: callback || false,
			cache: false,
			url: url,
			data: params,
			success: callback || function (back) {
				ret = back;
			},
			dataType: 'json',
			error: function (req, status, ex) {

			},
			timeout: 60000,
		});
		return ret;
	},
	// 微服务-采集-查询模型库列表
	libraryList: function (id, callback) {
		return this.ajaxGet2(this.tableName + '/library/industry/', '', callback);
	},
	// 微服务-采集-查询单个物体
	rThing: function (id, callback) {
		return this.ajaxGet2(this.tableName + '/thing/get/' + id, '', callback);
	},
	// 微服务-采集-删除单个物体
	dThing: function (id, callback) {
		return this.ajaxGet2(this.tableName + '/thing/remove/' + id, '', callback);
	},
	// 查询多条数据
	qDetail: function (param, callback) {
		return this.ajaxPost2(this.appName + '/detail/qDetail', param, callback);
	},
	// 查询单条数据
	rDetail: function (id, callback) {
		return this.ajaxGet2(this.appName + '/detail/rDetail', { 'id': id, }, callback);
	},
	// 更新单条数据
	uDetail: function (param, callback) {
		return this.ajaxPost2(this.appName + '/detail/uDetail', param, callback);
	},
	// 查询多条采集数据
	qCollection: function (param, callback) {
		return this.ajaxPost2(this.appName + '/collection/qCollection', param, callback);
	},
	// 查询单条采集数据
	rCollection: function (id, callback) {
		return this.ajaxGet2(this.appName + '/collection/rCollection', { 'id': id, }, callback);
	},
	// 更新单条采集数据
	uCollection: function (param, callback) {
		return this.ajaxPost2(this.appName + '/collection/uCollection', param, callback);
	},
	// 创建单条采集数据
	cCollection: function (param, callback) {
		return this.ajaxPost2(this.appName + '/collection/cCollection', param, callback);
	},
	// 删除单条采集数据
	dCollection: function (id, callback) {
		return this.ajaxGet2(this.appName + '/collection/dCollection', { 'id': id, }, callback);
	},
	// 查询多条分组数据
	qGroup: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/qGroup', param, callback);
	},
	// 查询单条分组数据
	rGroup: function (id, callback) {
		return this.ajaxGet2(this.appName + '/relation/rGroup', { 'id': id, }, callback);
	},
	// 更新单条分组数据
	uGroup: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/uGroup', param, callback);
	},
	// 创建单条采集数据
	cGroup: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/cGroup', param, callback);
	},
	// 删除单条采集数据
	dGroup: function (id, callback) {
		return this.ajaxGet2(this.appName + '/relation/dGroup', { 'id': id, }, callback);
	},
	// 查询多条关联数据
	qLink: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/qLink', param, callback);
	},
	// 查询单条分组数据
	rLink: function (id, callback) {
		return this.ajaxGet2(this.appName + '/relation/rLink', { 'id': id, }, callback);
	},
	// 更新单条分组数据
	uLink: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/uLink', param, callback);
	},
	// 创建单条采集数据
	cLink: function (param, callback) {
		return this.ajaxPost2(this.appName + '/relation/cLink', param, callback);
	},
	// 删除单条采集数据
	dLink: function (id, callback) {
		return this.ajaxGet2(this.appName + '/relation/dLink', { 'id': id, }, callback);
	},
};
// 删除cookie
var delCookie = function (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
	}
};
// 获取cookie、
var getCookie = function (cname) {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1);
		if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
	}
	return '';
};
