<template>
	<v-navigation-drawer :temporary="name == 'sm'" v-model="main.menu">
		<main class="d-flex align-center py-4 px-2 bg-grey-lighten-4">
			<!-- <v-icon color="primary" size="40">mdi-vuetify</v-icon> -->
			<v-icon color="primary" size="40" v-if="Auth.isDriver">mdi-chess-knight</v-icon>
			<v-icon color="primary" size="40" v-if="Auth.isPassenger">mdi-chess-pawn</v-icon>
			<v-icon color="primary" size="40" v-if="Auth.isAdmin">mdi-chess-rook</v-icon>
			<v-icon color="primary" size="40" v-if="Auth.isSuperAdmin">mdi-chess-king</v-icon>
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

				<v-row v-if="Auth.isPassenger || Auth.isDriver" class="my-2">
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
				<v-divider v-if="Auth.isPassenger || Auth.isDriver"></v-divider>
				<v-list density="compact">
					<v-list-item v-if="Auth.isDriverAdmins" title="Transportlarim" prepend-icon="mdi-car-settings"
						:to="{ name: 'user-transports' }" class="mb-2" />
					<v-list-item v-if="Auth.isAnyAdmins" prepend-icon="mdi-train-car" title="Barcha Transportlar"
						:to="{ name: 'transports' }" />

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