<template>
	<v-navigation-drawer :temporary="name == 'sm'" v-model="main.menu">
		<main class="d-flex justify-center align-center flex-column  py-1 tw-bg-slate-100">
			<v-icon color="primary" size="40">mdi-vuetify</v-icon>
			<aside class="d-flex justify-space-between flex-column align-right">
				<span class="font-weight-bold text-h6 tw-leading-3 mt-2 mb-1">
					{{ authStore.user?.name }}
				</span>
				<span class="text-caption text-blue-grey-lighten-1">
					{{ authStore.user?.phone }}
				</span>
			</aside>
		</main>
		<v-divider></v-divider>
		<div>
			<v-list density="compact">
				<v-list-item prepend-icon="mdi-phone-classic" title="Operatorlarga"
					:class="{ 'text-primary v-list-item--active': $route.name == 'operator' }" color="primary"
					:to="{ name: 'operator', params: { id: 1 } }" />
			</v-list>
			<v-divider class="border-opacity-50"></v-divider>
			<v-list density="compact">
				<v-list-item prepend-icon="mdi-train-car" title="Transportlar" color="primary"
					:to="{ name: 'transports' }" />
				<v-list-item prepend-icon="mdi-car-settings" title="Junatilgan transportlar" color="primary"
					:to="{ name: 'send-roads' }" />
			</v-list>
		</div>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { useMainStore, useAuthStore } from '@/store'
import { useDisplay } from 'vuetify'
const { name } = useDisplay()
const main = useMainStore()
const authStore = useAuthStore()


</script>