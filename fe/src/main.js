// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
import './components/element-ui'
// import 'assets/custom-theme/index.css'; // 换肤版本element-ui css https://github.com/PanJiaChen/custom-element-theme
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式
import 'components/Icon-svg/index'; // 封装的svg组件
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
import i18n from './i18n'
import axios from 'utils/fetch';
Vue.prototype.$http = axios;
//import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
//import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
// import Sticky from 'components/Sticky'; // 粘性header组件
// import vueWaves from './directive/waves';// 水波纹指令
// import errLog from 'store/errLog';// error log组件
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟

// register globally
//Vue.component('multiselect', Multiselect);
// Vue.component('Sticky', Sticky);
// Vue.use(ElementUI);
// Vue.use(vueWaves);
// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
});

// permissiom judge
function hasPermission(roles, permissionRoles) {
	if (roles.indexOf('admin') >= 0) {
		return true
	} // admin权限 直接通过
	if (!permissionRoles) {
		return true
	}
	return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd']; //
router.beforeEach((to, from, next) => {
	NProgress.start(); // 开启Progress
	if (store.getters.token) { // 判断是否有token
		if (to.path === '/login') {
			next({path: '/'});
		} else {
			if (store.getters.roles.length === 0) { //
				//   return true;
				store.dispatch('GetInfo').then(res => { // 拉取user_info
					const roles = res.data.role;
					//   debugger;
					store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
						router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
						next(to.path); // hack方法 确保addRoutes已完成
					})
				}).catch(err => {
					throw new Error(err)
				});
			} else {
				// 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
				if (hasPermission(store.getters.roles, to.meta.role)) {
					next(); //
				} else {
					next({
						path: '/401',
						query: {
							noGoBack: true
						}
					});
				}
				// 可删 ↑
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next('/login'); // 否则全部重定向到登录页
			NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
		}
	}
});

router.afterEach(() => {
	NProgress.done(); // 结束Progress
});

// window.onunhandledrejection = e => {
//     console.log('unhandled', e.reason, e.promise);
//     e.preventDefault()
// };

// 生产环境错误日志
// if (process.env === 'production') {
//   Vue.config.errorHandler = function(err, vm) {
//     console.log(err, window.location.href);
//     errLog.pushLog({
//       err,
//       url: window.location.href,
//       vm
//     })
//   };
// }

// window.onerror = function (msg, url, lineNo, columnNo, error) {
//     console.log('window')
// };
//
// console.error = (function (origin) {
//     return function (errorlog) {
//         // handler();//基于业务的日志记录及数据报错
//         console.log('console'+errorlog)
//         origin.call(console, errorlog);
//     }
// })(console.error);

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');

// if (module.hot) {
//     module.hot.accept(['@/i18n/zh.json', '@/i18n/en.json'], function () {
//     i18n.setLocaleMessage('zh', require('@/i18n/zh.json').default)
//     i18n.setLocaleMessage('en', require('@/i18n/en.json').default)
//     // Or the following hot updates via $i18n property
//     // app.$i18n.setLocaleMessage('en', require('./en').default)
//     // app.$i18n.setLocaleMessage('ja', require('./ja').default)
//   })
// }