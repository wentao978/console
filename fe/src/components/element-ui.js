import Vue from 'vue'
import {
	Button,
	Breadcrumb,
	BreadcrumbItem,
	Checkbox,
	Col,
	DatePicker,
	Dialog,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Form,
	FormItem,
	Input,
	Loading,
	Message,
	MessageBox,
	Menu,
	MenuItem,
	Notification,
	Option,
	Pagination,
	Rate,
	Row,
	Submenu,
	Select,
	Table,
	TableColumn,
	Tag,
	Tooltip
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
window.localStorage.getItem('lan') === 'en'
	? locale.use(lang)
	: '';

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading)
// Vue.use(Message)
// Vue.use(MessageBox)
Vue.use(Menu)
Vue.use(MenuItem)
// Vue.use(Notification)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Rate)
Vue.use(Row)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Loading.directive)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
