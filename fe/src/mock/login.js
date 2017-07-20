import {param2Obj} from 'utils';

const userMap = {
	admin: {
		role: ['admin'],
		token: 'admin',
		introduction: '我是超级管理员',
		avatar: 'https://q3.qlogo.cn/g?b=qq&k=OUyBPXfzMcJo3Ud6Mb6gRQ&s=140&t=1483322487',
		name: '超级管理员',
		uid: '001'
	},
	editor: {
		role: ['editor'],
		token: 'editor',
		introduction: '我是编辑',
		avatar: 'https://q3.qlogo.cn/g?b=qq&k=OUyBPXfzMcJo3Ud6Mb6gRQ&s=140&t=1483322487',
		name: '普通编辑',
		uid: '002'

	},
	developer: {
		role: ['develop'],
		token: 'develop',
		introduction: '我是开发',
		avatar: 'https://q3.qlogo.cn/g?b=qq&k=OUyBPXfzMcJo3Ud6Mb6gRQ&s=140&t=1483322487',
		name: '工程师',
		uid: '003'
	}
}

export default {
	loginByEmail : config => {
		const {email} = JSON.parse(config.body); // config.body是一个json字符串
		return userMap[email.split('@')[0]];
	},
	getInfo : config => {
		const {token} = param2Obj(config.url);
		if (userMap[token]) {
			return userMap[token];
		} else {
			return Promise.reject('no such user');
		}
	},
	logout : () => 'success'
};
