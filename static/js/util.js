// 获取cookie、
var getCookie = function (name) {
	var arr = []
	var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	if (arr === document.cookie.match(reg)) {
		return (arr[2])
	} else {
		return null
	}
}
// 设置cookie,增加到vue实例方便全局调用
var setCookie = function (name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
var delCookie = function (name) {
	var exp = new Date()
	exp.setTime(exp.getTime() - 1)
	var cval = getCookie(name)
	if (cval != null) {
		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
	}
}
export {getCookie, setCookie, delCookie}
