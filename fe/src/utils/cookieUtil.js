let CookieUtil = {
	getCookie: function(cookieName) {
		let cookies = document.cookie.split("; "),
			pair; //一个分号加一个空格
		if (!cookies.length) {
			return;
		}
		for (let i = 0; i < cookies.length; i++) {
			pair = cookies[i].split("="); //以赋值号分隔,第一位是cookie名,第二位是cookie值
			if (decodeURIComponent(pair[0]) === cookieName) {
				return decodeURIComponent(pair[1]);
			}
		}
	},
	setCookie: function(name, value, expires, path, domain, secure) {
		let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`; //不要忘了在对应getCookie函数里面加上decodeURI方法
		if (expires) { //以数字天为单位 --->egg:2
			str += `; expires=${new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toGMTString()}`;
		}
		if (path) {
			str += `; path=${path}`;
		}
		if (domain) {
			str += `; domain=${domain}`;
		}
		if (secure) {
			str += "; secure";
		}
		document.cookie = str;
	},
	delCookie: function(cookieName, path, domain, secure) {
		this.setCookie(cookieName, '', new Date(0), path, domain, secure);
	}
}

export default CookieUtil;
