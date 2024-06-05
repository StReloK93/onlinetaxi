<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<AddForm :date="true" />
			<!-- <Filters ref="filterComponent" />
			<Sorting /> -->
		</main>
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 w-100 h-100 right-0 bottom-0 overflow-x-auto overflow-y-hidden px-1">
				<TransitionGroup name="list">
					<CardCarRide v-for="ride in rideStore.rides" :ride="ride" :key="ride.id" />
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRide, CardCarRide, CarRideRepository } from '@/features/CarRides'
import { watch, onMounted, reactive, provide } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const rideStore = useCarRide()


const CRUD = reactive({
	show: async function (ride_id) {

		return await CarRideRepository.show(ride_id)

	},
	create: async function (formData) {

		const car_ride = await CarRideRepository.create(formData)
		rideStore.create(car_ride)

	},
	update: async function (ride_id, formData) {

		const ride = await CarRideRepository.update(ride_id, formData);
		rideStore.update(ride)

	},
	destroy: async function (ride_id) {

		await CarRideRepository.destroy(ride_id)
		rideStore.destroy(ride_id)

	}
})

provide('CRUD', CRUD)


watch(() => route.meta.method, async (current: any) => {
	rideStore.rides = await CarRideRepository[current]()
})
onMounted(async () => {
	const method = route.meta.method as any
	rideStore.rides = await CarRideRepository[method]()
})
</script>