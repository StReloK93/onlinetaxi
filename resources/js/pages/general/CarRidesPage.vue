<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<AddForm v-if="Auth.isAnyAdmins || Auth.isDriver"/>
			<!-- <Filters ref="filterComponent" />
			<Sorting /> -->
		</main>
		<v-spacer class="position-relative">
			<main
				class="position-absolute top-0 left-0 w-100 h-100 right-0 bottom-0 overflow-x-auto overflow-y-hidden px-1">
				<TransitionGroup name="list">
					<CardCarRide v-for="ride in rideStore.activeRides" :ride="ride" :key="ride.id" />
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRide, CardCarRide, CarRideRepository } from '@/features/CarRides'
import { watch, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
import { useRoute } from 'vue-router'
const route = useRoute()

const rideStore = useCarRide()


watch(() => route.meta.method, async (current: any) => {
	rideStore.rides = await CarRideRepository.getOnlyActive()
	rideStore.filters = route.meta.method
})
onMounted(async () => {
	rideStore.rides = await CarRideRepository.getOnlyActive()
	rideStore.filters = route.meta.method
})

onUnmounted(() => {
	rideStore.rides = null
})
</script>