import CookieUtil from 'utils/cookieUtil'

const app = {
	state: {
		sidebar: {
			opened: !+ CookieUtil.getCookie('sidebarStatus')
		},
		theme: 'default',
		livenewsChannels: CookieUtil.getCookie('livenewsChannels') || '[]'
	},
	mutations: {
		TOGGLE_SIDEBAR: state => {
			if (state.sidebar.opened) {
				CookieUtil.setCookie('sidebarStatus', 1);
			} else {
				CookieUtil.setCookie('sidebarStatus', 0);
			}
			state.sidebar.opened = !state.sidebar.opened;
		}
	},
	actions: {
		ToggleSideBar: ({commit}) => {
			commit('TOGGLE_SIDEBAR')
		}
	}
};

export default app;
