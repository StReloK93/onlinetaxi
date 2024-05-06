import { vuetify, App, CustomForm, AgGridVue, VCalendar, money } from '@/modules'
import { createApp } from 'vue'
import { useAuthStore } from '@/store'
import { createPinia } from 'pinia'
import router from '@/routes'
import { vMaska } from "maska"
import './swInit'



async function init() {
	const pinia = createPinia()
	const app = createApp(App)
		.directive('Maska', vMaska)
		.component('AgGridVue', AgGridVue)
		.component('CustomForm', CustomForm)
		.use(vuetify)
		.use(pinia)
		.use(VCalendar, {})
		.use(money)

	await useAuthStore().getUser()
	app.use(router)
	app.mount("#app")
	// axios.defaults.headers.common['X-Socket-Id'] = echo.socketId();
}
init()