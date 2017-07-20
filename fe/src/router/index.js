import Vue from 'vue';
import Router from 'vue-router';
import i18n from '../i18n'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)
//
// /**
//     对于js文件中的汉字，可采用如下方法，暂时只支持json中的两层嵌套
// */
// const i18n = new VueI18n({
//   locale: window.localStorage.getItem('lan') || 'zh',
//   messages: {
//     'en': require('@/i18n/en.json'),
//     'zh': require('@/i18n/zh.json')
//   }
// })
//
// const lan = window.localStorage.getItem('lan') || 'zh';
//
// const i18n.t =  arg  => {
//     if(!arg.indexOf('.')){
//         return i18n.messages[lan][arg]
//     }else{
//         return i18n.messages[lan][arg.split('.')[0]][arg.split('.')[1]]
//     }
//
// }

// const Info = r => require.ensure([], () => r(require('@components/info')), 'info')
// const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
// const Foo = resolve => require(['./Foo.vue'], resolve)

/* layout */
// import Layout from '../views/layout/Layout';
const Layout = r => require.ensure([], () => r(require('../views/layout/Layout')), 'Layout');
// const Layout = resolve => require(['../views/layout/Layout'], resolve)

/* login */
// import Login from '../views/login/';
const Login = r => require.ensure([], () => r(require('../views/login/')), 'Login')
// const Login = resolve => require(['../views/login/'], resolve)
// const authRedirect = () => import('../views/login/authredirect');
// const sendPWD = () => import('../views/login/sendpwd');
// const reset = () => import('../views/login/reset');

/* dashboard */
// const dashboard = () => import('../views/dashboard/index');
const dashboard = r => require.ensure([], () => r(require('../views/dashboard/index')), 'dashboard')
// const dashboard = resolve => require(['../views/dashboard/index'], resolve)

/* Introduction */
// const Introduction = () => import('../views/introduction/index');

/* components */
// const componentsIndex = () => import('../views/components/index');
// const Tinymce = () => import('../views/components/tinymce');
// const Markdown = () => import('../views/components/markdown');
// const JsonEditor = () => import('../views/components/jsoneditor');
// const DndList = () => import('../views/components/dndlist');
// const AvatarUpload = () => import('../views/components/avatarUpload');
// const Dropzone = () => import('../views/components/dropzone');
// const Sticky = () => import('../views/components/sticky');
// const SplitPane = () => import('../views/components/splitpane');
// const CountTo = () => import('../views/components/countTo');
// const Mixin = () => import('../views/components/mixin');

/* charts */
// const chartIndex = () => import('../views/charts/index');
// const KeyboardChart = () => import('../views/charts/keyboard');
// const KeyboardChart2 = () => import('../views/charts/keyboard2');
// const LineMarker = () => import('../views/charts/line');
// const MixChart = () => import('../views/charts/mixchart');
const MixChart = r => require.ensure([], () => r(require('../views/charts/mixchart')), 'MixChart')
// const MixChart = resolve => require(['../views/charts/mixchart'], resolve)

/* error page */
// const Err404 = () => import('../views/error/404');
const Err404 = r => require.ensure([], () => r(require('../views/error/404')), 'Err404')
// const Err404 = resolve => require(['../views/error/404'], resolve)

// const Err401 = () => import('../views/error/401');

/* error log */
// const ErrorLog = () => import('../views/errlog/index');

/* excel */
// const ExcelDownload = () => import('../views/excel/index');

/* theme  */
// const Theme = () => import('../views/theme/index');

/* example*/
// const TableLayout = () => import('../views/example/table/index');
const TableLayout = r => require.ensure([], () => r(require('../views/example/table/index')), 'TableLayout')
// const TableLayout = resolve => require(['../views/example/table/index'], resolve)

// const DynamicTable = () => import('../views/example/table/dynamictable');
// const Table = () => import('../views/example/table/table');
const Table = r => require.ensure([], () => r(require('../views/example/table/table')), 'Table')
// const Table = resolve => require(['../views/example/table/table'], resolve)

// const DragTable = () => import('../views/example/table/dragTable');
// const InlineEditTable = () => import('../views/example/table/inlineEditTable');
// const Form1 = () => import('../views/example/form1');
const Form1 = r => require.ensure([], () => r(require('../views/example/form1')), 'Form1')
// const Form1 = resolve => require(['../views/example/form1'], resolve)

/* permission */
// const Permission = () => import('../views/permission/index');
// const Permission = r => require.ensure([], () => r(require('../views/permission/index')), 'Permission')
// const Permission = resolve => require(['../views/permission/index'], resolve)

Vue.use(Router);

/**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
	{
		path: '/login',
		component: Login,
		hidden: true
	},
	// { path: '/authredirect', component: authRedirect, hidden: true },
	// { path: '/sendpwd', component: sendPWD, hidden: true },
	// { path: '/reset', component: reset, hidden: true },
	{
		path: '/404',
		component: Err404,
		hidden: true
	},
	// { path: '/401', component: Err401, hidden: true },
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		beforeEnter: (to, from, next) => {
			next();
		},
		name: i18n.t('route.home'), //首页
		hidden: true,
		children: [
			{
				path: 'dashboard',
				component: dashboard
			}
		]
	},
	// {
	//   path: '/introduction',
	//   component: Layout,
	//   redirect: '/introduction/index',
	//   icon: 'xinrenzhinan',
	//   noDropdown: true,
	//   children: [{ path: 'index', component: Introduction, name: '简述' }]
	// }
]

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({y: 0}),
	base: '/cloud-admin/',
	routes: constantRouterMap
});

export const asyncRouterMap = [
	// {
	//   path: '/permission',
	//   component: Layout,
	//   redirect: '/permission/index',
	//   name: '权限测试',
	//   icon: 'quanxian',
	//   meta: { role: ['admin'] },
	//   noDropdown: true,
	//   children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
	// },
	// {
	//   path: '/components',
	//   component: Layout,
	//   redirect: '/components/index',
	//   name: '组件',
	//   icon: 'zujian',
	//   children: [
	//     { path: 'index', component: componentsIndex, name: '介绍 ' },
	//     { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
	//     { path: 'markdown', component: Markdown, name: 'Markdown' },
	//     { path: 'jsoneditor', component: JsonEditor, name: 'JSON编辑器' },
	//     { path: 'dndlist', component: DndList, name: '列表拖拽' },
	//     { path: 'splitpane', component: SplitPane, name: 'SplitPane' },
	//     { path: 'avatarupload', component: AvatarUpload, name: '头像上传' },
	//     { path: 'dropzone', component: Dropzone, name: 'Dropzone' },
	//     { path: 'sticky', component: Sticky, name: 'Sticky' },
	//     { path: 'countto', component: CountTo, name: 'CountTo' },
	//     { path: 'mixin', component: Mixin, name: '小组件' }
	//   ]
	// },
	{
		path: '/charts',
		component: Layout,
		redirect: '/charts/index',
		name: i18n.t('route.chart'), //图表
		icon: 'tubiaoleixingzhengchang',
		children: [
			//{ path: 'index', component: chartIndex, name: '介绍' },
			//   { path: 'keyboard', component: KeyboardChart, name: '键盘图表' },
			//   { path: 'keyboard2', component: KeyboardChart2, name: '键盘图表' },
			//   { path: 'line', component: LineMarker, name: '折线图' },
			{
				path: 'mixchart',
				component: MixChart,
				name: i18n.t('route.mchart')
			} //混合图表
		]
	},
	// {
	//   path: '/errorpage',
	//   component: Layout,
	//   redirect: 'noredirect',
	//   name: '错误页面',
	//   icon: '404',
	//   children: [
	//     { path: '401', component: Err401, name: '401' },
	//     { path: '404', component: Err404, name: '404' }
	//   ]
	// },
	// {
	//   path: '/errlog',
	//   component: Layout,
	//   redirect: 'noredirect',
	//   name: 'errlog',
	//   icon: 'bug',
	//   noDropdown: true,
	//   children: [{ path: 'log', component: ErrorLog, name: '错误日志' }]
	// },
	// {
	//   path: '/excel',
	//   component: Layout,
	//   redirect: 'noredirect',
	//   name: 'excel',
	//   icon: 'EXCEL',
	//   noDropdown: true,
	//   children: [{ path: 'download', component: ExcelDownload, name: '导出excel' }]
	// },
	{
		path: '/example',
		component: Layout,
		redirect: 'noredirect',
		name: i18n.t('route.comprehensive'), //综合实例 Comprehensive
		icon: 'zonghe',
		children: [
			{
				path: '/table',
				component: TableLayout,
				redirect: '/table/table',
				name: i18n.t('route.table'), //表格 table
				children: [
					//{ path: 'dynamictable', component: DynamicTable, name: '动态table' },
					//{ path: 'dragtable', component: DragTable, name: '拖拽table' },
					//   { path: 'inline_edit_table', component: InlineEditTable, name: 'table内编辑' },
					{
						path: 'table',
						component: Table,
						name: i18n.t('route.mtable')
					} //综合table mtable
				]
			},
			//   { path: 'form1', component: Form1, name: '综合form1' }
		]
	}, {
		path: '/form1',
		component: Layout,
		redirect: 'noredirect',
		name: '综合form',
		icon: 'wujiaoxing',
		noDropdown: true,
		children: [
			{
				path: 'index',
				component: Form1,
				name: i18n.t('route.form'),
				meta: {
					role: ['admin']
				}
			}
		]
	}, {
		path: '*',
		redirect: '/404',
		hidden: true
	}
];
