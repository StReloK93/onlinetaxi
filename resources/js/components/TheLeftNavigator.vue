<template>
	<v-navigation-drawer :temporary="name == 'sm'" v-model="main.menu">
		<main class="d-flex align-center py-4 px-2 bg-grey-lighten-4">
			<v-icon color="primary" size="40">mdi-vuetify</v-icon>
			<aside>
				<div class="font-weight-bold text-h6 leading-none mt-2">
					{{ Auth.user?.name }}
				</div>
				<div class="text-caption text-blue-grey-lighten-1">
					{{ Auth.user?.phone }}
				</div>
			</aside>
		</main>
		<v-divider></v-divider>
		<div>
			<div class="pa-2">
				<v-btn v-if="deferredPrompt" @click="installApp" block append-icon="mdi-download" variant="tonal"
					class="mb-2">
					Ilovani o'rnatish
				</v-btn>
				<v-divider v-if="deferredPrompt" class="mb-2"></v-divider>
				<BaseSelectPosition />
				<v-list density="compact">
					<v-list-item title="Transportlarim" prepend-icon="mdi-car-settings" :to="{ name: 'user-transports' }"
						class="mb-2" />
				</v-list>
			</div>
		</div>

		<template v-slot:append>
			<div class="pa-2">
				<div class="mb-2 text-right">
					<v-label class="text-caption mr-1">
						Savol va takliflar uchun
					</v-label>
					<a href="tel:+99893 660 09 60" class="d-block text-decoration-none text-caption text-primary">+99893 660 09 60</a>
					<a href="tel:+99893 660 09 60" class="d-block text-decoration-none text-caption text-primary">+99894 677 11 34</a>
				</div>
				<v-btn @click="alertLogout" block append-icon="mdi-logout">
					Chiqish
				</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import BaseSelectPosition from './BaseSelectPosition.vue'
import { useDisplay } from 'vuetify'
import { inject } from 'vue'
const { name } = useDisplay()
const main = useMainStore()
const Auth = useAuthStore()




const deferredPrompt: any = inject('deferredPrompt')

function alertLogout() {
	const main = useMainStore()

	main.dialog.open(() => {
		main.dialog.title = "Dasturdan chiqmoqchimisiz ?"
		main.dialog.submit = () => Auth.logout()
	})
}

function installApp() {
	if (deferredPrompt) {
		deferredPrompt.value.prompt()
		deferredPrompt.value.userChoice
			.then(choiceResult => {
				if (choiceResult.outcome === 'accepted') {
					console.log('user accepted A2HS prompt')
				} else {
					console.log('user dismissed A2HS prompt')
				}
				deferredPrompt.value = null
			})
	}
}

</script>