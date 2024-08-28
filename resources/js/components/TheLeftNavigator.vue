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
				<v-divider v-if="deferredPrompt"></v-divider>
				<BaseSelectPosition />
				<v-list density="compact">
					<v-list-item title="Transportlarim" prepend-icon="mdi-car-settings"
						:to="{ name: 'user-transports' }" class="mb-2" />
				</v-list>
			</div>
		</div>

		<template v-slot:append>
			<div class="pa-2">
				<v-btn @click="alertLogout" block append-icon="mdi-logout">
					Chiqish
				</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import BaseSelectPosition from './BaseSelectPosition.vue'
import { useDisplay } from 'vuetify'
import { inject, ref } from 'vue'
const { name } = useDisplay()
const main = useMainStore()
const Auth = useAuthStore()

const router = useRouter()

const loadingRoleButton = ref(false)
async function changeRole(role_id) {
	if (Auth.user.role_id == role_id) return

	loadingRoleButton.value = true
	await Auth.changeRole(role_id)
	if (role_id == 3) router.push({ name: 'passengers' })
	if (role_id == 4) router.push({ name: 'car-rides' })
	loadingRoleButton.value = false
}
function fakeChangeRole(role_id) {
	Auth.user.role_id = role_id
}

function color(role_id) {
	return Auth.user.role_id == role_id ? 'primary' : 'grey-lighten-4'
}

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