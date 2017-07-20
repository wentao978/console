import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: window.localStorage.getItem('lan') || 'zh',
	messages: {
		'en': require('@/i18n/en.json'),
		'zh': require('@/i18n/zh.json')
	}
})

export default i18n
