<template>
	<main class="d-flex tw-flex-col">
		<Add v-if="Auth.isAnyAdmins || Auth.isPassenger" @create="onCreate"></Add>
		<v-spacer class="overflow-hidden position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-x-auto px-1">
				<PassengerRenderer v-for="passenger in passengerStore.passengers" :passenger="passenger" />
			</main>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { PassengerRenderer, Add, PassengerRepository, usePassengerStore } from '@/features/Passengers';
import { useAuthStore } from '@/store/useAuthStore'

const Auth = useAuthStore()
const passengerStore = usePassengerStore()


function onCreate(Transport) {
	passengerStore.passengers.push(Transport)
}

onMounted(async () => {
	passengerStore.passengers = await PassengerRepository.index()
})
</script>