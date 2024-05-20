<template>
	<v-navigation-drawer :temporary="name == 'sm'" v-model="main.menu">
		<main class="d-flex align-center py-4 px-2 tw-bg-slate-100">
			<v-icon color="primary" size="40">mdi-vuetify</v-icon>
			<aside>
				<div class="font-weight-bold text-h6 tw-leading-3 mt-2 mb-1">
					{{ Auth.user?.name }}
				</div>
				<div class="text-caption text-blue-grey-lighten-1">
					{{ Auth.user?.phone }}
				</div>
			</aside>
		</main>
		<v-divider></v-divider>
		<div>
			<v-list v-if="Auth.isAnyAdmins" density="compact">
				<v-list-item
					prepend-icon="mdi-phone-classic"
					title="Operatorlarga"
					:class="{ 'text-primary v-list-item--active': $route.name == 'operator' }"
					color="primary"
					:to="{ name: 'operator', params: { id: 1 } }"
				/>
				<v-list-item prepend-icon="mdi-car-settings" title="Junatilgan transportlar" color="primary"
					:to="{ name: 'send-roads' }" />
			</v-list>
			<v-divider class="border-opacity-50"></v-divider>
		</div>

		<template v-slot:append>
          <div class="pa-2">
            <v-btn @click="Auth.alertLogout" block append-icon="mdi-logout">
              Chiqish
            </v-btn>
          </div>
        </template>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { useMainStore, useAuthStore } from '@/store'
import { useDisplay } from 'vuetify'
const { name } = useDisplay()
const main = useMainStore()
const Auth = useAuthStore()


</script>