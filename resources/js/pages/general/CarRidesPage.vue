<template>
	<main class="d-flex flex-column">
		<main class="mt-n2 mb-2">
			<Filters />
		</main>
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<template v-if="rideStore.activeRides?.length">
						<CardCarRide @activate="selectActive" :activeCard="activeCard" v-for="ride in rideStore.activeRides"
							:ride="ride" :key="ride.id" />
					</template>
					<!-- <v-alert v-else text="Haydovchilar topilmadi"></v-alert> -->
				</TransitionGroup>
			</main>
		</v-spacer>
		<main>
			<AddForm :submit="rideStore.create" />
		</main>
	</main>
</template>
<script setup lang="ts">
import { AddForm, Filters, useCarRide, CardCarRide, CarRideRepository } from '@/features/CarRides'
import { onMounted, onUnmounted, ref } from 'vue'
const rideStore = useCarRide()
const activeCard = ref(null)

function selectActive(id) {
	if (activeCard.value == id) return activeCard.value = null
	else return activeCard.value = id
}

onMounted(async () => {
	rideStore.rides = await CarRideRepository.getOnlyActive()
})

onUnmounted(() => {
	rideStore.rides = null
	rideStore.onClearFilter()
})
</script>