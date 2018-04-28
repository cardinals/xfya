// 获取cookie、
var getCookie = function (cname) {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return '';
};
// 设置cookie,增加到vue实例方便全局调用
var setCookie = function (name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
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
var newGuid = function () {
	var guid = '';
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
			guid += '-';
		}
	}
	return guid;
};
export {getCookie, setCookie, delCookie, newGuid};
