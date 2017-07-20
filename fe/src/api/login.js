import fetch from 'utils/fetch';

export function loginByEmail(email, password) {
	const data = {
		email,
		password
	};
	return fetch({url: '/login/loginbyemail', method: 'get', params: data});
}

export function logout() {
	return fetch({url: '/login/logout', method: 'get'});
}

export function getInfo(token) {
	return fetch({url: '/user/info', method: 'get', params: {
			token
		}});
}
