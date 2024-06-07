<template>
	<main class="d-flex tw-flex-col">
		<AddForm v-if="Auth.isAnyAdmins || Auth.isPassenger" />
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<Card v-for="passenger in passengerStore.passengers" :passenger="passenger" :key="passenger.id"/>
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Card, AddForm, PassengerRepository, usePassengerStore } from '@/features/Passengers';
import { useAuthStore } from '@/store/useAuthStore'

const Auth = useAuthStore()
const passengerStore = usePassengerStore()


onMounted(async () => {
	passengerStore.passengers = await PassengerRepository.index()
})
onUnmounted(() => {
	passengerStore.passengers = null
})
</script>