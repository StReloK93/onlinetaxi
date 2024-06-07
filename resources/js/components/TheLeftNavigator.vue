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
			<!-- <v-list v-if="Auth.isAnyAdmins" density="compact">
				<v-list-item prepend-icon="mdi-phone-classic" title="Operatorlarga"
					:class="{ 'text-primary v-list-item--active': $route.name == 'operator' }" color="primary"
					:to="{ name: 'operator', params: { id: 1 } }" />
				<v-list-item prepend-icon="mdi-car-settings" title="Junatilgan transportlar" color="primary"
					:to="{ name: 'car-ride-inactive' }" />
			</v-list> -->
			<!-- <v-divider></v-divider> -->
			<div class="pa-2">
				<v-row v-if="Auth.isPassenger || Auth.isDriver"  class="mb-3 mt-0">
					<v-col cols="6" class="py-0 pr-1">
						<v-btn @click="changeRole(4)" :loading="loadingRoleButton" :color="color(4)" variant="flat" block>
							Haydovchi
						</v-btn>
					</v-col>
					<v-col cols="6" class="py-0 pl-1">
						<v-btn @click="changeRole(3)" :loading="loadingRoleButton" :color="color(3)" variant="flat" block>
							Yo'lovchi
						</v-btn>
					</v-col>
				</v-row>
				<v-btn v-if="deferredPrompt" @click="installApp" block append-icon="mdi-download" variant="tonal" class="mb-3">
					Ilovani o'rnatish
				</v-btn>
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
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { useDisplay } from 'vuetify'
import { inject, ref } from 'vue'
const { name } = useDisplay()
const main = useMainStore()
const Auth = useAuthStore()

const loadingRoleButton = ref(false)
async function changeRole(role_id) {
	if (Auth.user.role_id == role_id) return

	loadingRoleButton.value = true
	await Auth.changeRole(role_id)
	loadingRoleButton.value = false
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