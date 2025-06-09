import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"
import { useAuthStore } from '@/store/useAuthStore'
const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to, from, next) => {
	const store = useAuthStore()
	if (store.user) {
		if (to.meta.guard === 'guest' || (["", null].includes(store.user.name) == false && to.name == 'welcome')) return next({ name: 'main' })
		else if (to.name != 'welcome' && ["", null].includes(store.user.name)) return next({ name: 'welcome' })
		else return next()
	}
	else {
		if (to.meta.guard === 'auth') return next({ name: 'login' })
		else return next()
	}
})

export default router