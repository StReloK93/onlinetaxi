import { vuetify, App, BaseForm, VCalendar, money } from '@/modules'
import { createApp, ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { createPinia } from 'pinia'
import router from '@/routes'
import { vMaska } from "maska"
import initFirebase from './swInit'

import BaseUzPhoneInput from "@/components/BaseUzPhoneInput.vue"
const deferredPrompt = ref(null)

window.addEventListener('beforeinstallprompt', event => {
	event.preventDefault()
	deferredPrompt.value = event
})

async function init() {
	const app = createApp(App)
		.provide('deferredPrompt', deferredPrompt)
		.directive('Maska', vMaska)
		.component('BaseUzPhoneInput', BaseUzPhoneInput)
		.component('BaseForm', BaseForm)
		.use(vuetify)
		.use(createPinia())
		.use(VCalendar, {})
		.use(money)
	
		await initFirebase().catch(() => console.log('Aloqa yoq'))
		await useAuthStore().getUser()
		app.use(router)
		app.mount("#app")
}
init()