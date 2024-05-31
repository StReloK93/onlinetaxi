<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<AddForm v-if="Auth.isAnyAdmins || Auth.isDriver" :date="true" />
			<!-- <Filters ref="filterComponent" />
			<Sorting /> -->
		</main>
		<v-spacer class="overflow-hidden position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-x-auto px-1">
				<CardCarRide v-for="ride in CarRide.rides" :ride="ride" :key="ride.id" />
			</main>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRideStore, CardCarRide, CarRideRepository } from '@/features/CarRides'
import { watch, onMounted } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const Auth = useAuthStore()

const CarRide = useCarRideStore()
const methodName = route.meta.method as any


watch(() => route.meta.method, async (current) => {
	//@ts-ignore
	CarRide.rides = await CarRideRepository[current]()
})

onMounted(async () => {
	CarRide.rides = await CarRideRepository[methodName]()
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