<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<AddForm :date="true" />
			<!-- <Filters ref="filterComponent" />
			<Sorting /> -->
		</main>
		<v-spacer class="overflow-hidden position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-x-auto px-1">
				<TransitionGroup name="list">
					<CardCarRide v-for="ride in rideStore.rides" :ride="ride" :key="ride.id" />
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRide, CardCarRide, CarRideRepository } from '@/features/CarRides'
import { watch, onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const rideStore = useCarRide()


watch(() => route.meta.method, async (current:any) => {
	console.log(current);
	
	rideStore.rides = await CarRideRepository[current]()
})

onMounted(async () => {
	const method = route.meta.method as any
	rideStore.rides = await CarRideRepository[method]()
})
</script>















<!-- CarRide.agGrid.refreshClientSideRowModel()
CarRide.agGrid.redrawRows() -->
<!-- // echo.channel('home').listen('CarRideCreateEvent', (event) => {
    //     onCreate(event.msg)
    // }) -->

<!-- function setrowHeight(height) {
		CarRide.agRowHeight = height;
		setTimeout(() => CarRide.agGrid.resetRowHeights())
	}
	
	const { name } = useDisplay()
	watch(() => name.value, (current) => {
		setrowHeight(CardWidth[current])
	}) -->