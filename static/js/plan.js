/**
 * 消防预案
 * @author yanchaowei <yanchaowei@uinnova.com>
 * @date 2018-4-13
 */

var plan = {};
plan.remote = {
	appName: 'http://192.168.1.164:9998',
	tableName: 'http://192.168.1.164:9992',
	ajaxGet: function (url, params, callback) {
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
	ajaxPost: function (url, params, callback) {
		var ret = null;
		$.ajax({
			type: 'POST',
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
	// 微服务-采集-查询单个物体
	rThing: function (id, callback) {
		return this.ajaxGet(this.tableName + '/thing/get/' + id, '', callback);
	},
	// 微服务-采集-删除单个物体
	dThing: function (id, callback) {
		return this.ajaxGet(this.tableName + '/thing/remove/' + id, '', callback);
	},
	// 查询多条数据
	qDetail: function (param, callback) {
		return this.ajaxPost(this.appName + '/detail/qDetail', param, callback);
	},
	// 查询单条数据
	rDetail: function (id, callback) {
		return this.ajaxGet(this.appName + '/detail/rDetail', { 'id': id, }, callback);
	},
	// 更新单条数据
	uDetail: function (param, callback) {
		return this.ajaxPost(this.appName + '/detail/uDetail', param, callback);
	},
	// 查询多条采集数据
	qCollection: function (param, callback) {
		return this.ajaxPost(this.appName + '/collection/qCollection', param, callback);
	},
	// 查询单条采集数据
	rCollection: function (id, callback) {
		return this.ajaxGet(this.appName + '/collection/rCollection', { 'id': id, }, callback);
	},
	// 更新单条采集数据
	uCollection: function (param, callback) {
		return this.ajaxPost(this.appName + '/collection/uCollection', param, callback);
	},
	// 创建单条采集数据
	cCollection: function (param, callback) {
		return this.ajaxPost(this.appName + '/collection/cCollection', param, callback);
	},
	// 删除单条采集数据
	dCollection: function (id, callback) {
		return this.ajaxGet(this.appName + '/collection/dCollection', { 'id': id, }, callback);
	},
	// 查询多条分组数据
	qGroup: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/qGroup', param, callback);
	},
	// 查询单条分组数据
	rGroup: function (id, callback) {
		return this.ajaxGet(this.appName + '/relation/rGroup', { 'id': id, }, callback);
	},
	// 更新单条分组数据
	uGroup: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/uGroup', param, callback);
	},
	// 创建单条采集数据
	cGroup: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/cGroup', param, callback);
	},
	// 删除单条采集数据
	dGroup: function (id, callback) {
		return this.ajaxGet(this.appName + '/relation/dGroup', { 'id': id, }, callback);
	},
	// 查询多条关联数据
	qLink: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/qLink', param, callback);
	},
	// 查询单条分组数据
	rLink: function (id, callback) {
		return this.ajaxGet(this.appName + '/relation/rLink', { 'id': id, }, callback);
	},
	// 更新单条分组数据
	uLink: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/uLink', param, callback);
	},
	// 创建单条采集数据
	cLink: function (param, callback) {
		return this.ajaxPost(this.appName + '/relation/cLink', param, callback);
	},
	// 删除单条采集数据
	dLink: function (id, callback) {
		return this.ajaxGet(this.appName + '/relation/dLink', { 'id': id, }, callback);
	},
};
