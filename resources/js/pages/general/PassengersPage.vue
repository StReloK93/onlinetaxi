<template>
	<main class="d-flex flex-column">
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<PassengerInformation v-for="passenger in filtered_passengers" :passenger="passenger" :key="passenger.id" class="mb-2"/>
				</TransitionGroup>
			</main>
		</v-spacer>
		<AddForm v-if="AuthStore.isAnyAdmins || AuthStore.isPassenger" />
	</main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { Card, AddForm, PassengerRepository, usePassengerStore } from '@/features/Passengers';
import PassengerInformation from '@/features/OffersPassenger/components/PassengerInformation.vue';
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'

const AuthStore = useAuthStore()
const AppStore = useMainStore()
const passengerStore = usePassengerStore()

const filtered_passengers = computed(() => {
	if (AuthStore.user.role_id == 4)
		return passengerStore.passengers?.filter((passenger) => passenger.start_city == AppStore.city.id)
	else {
		return passengerStore.passengers
	}
	
})

onMounted(async () => {
	passengerStore.passengers = await PassengerRepository.index()
})
onUnmounted(() => {
	passengerStore.passengers = null
})
</script>