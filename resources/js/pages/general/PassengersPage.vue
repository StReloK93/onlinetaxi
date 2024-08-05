<template>
	<main class="d-flex flex-column">
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<Card @activate="selectActive" :activeCard="activeCard" :crud="true" v-for="passenger in filtered_passengers" :passenger="passenger" :key="passenger.id" class="mb-2"/>
				</TransitionGroup>
			</main>
		</v-spacer>
		<AddForm v-if="AuthStore.isAnyAdmins || AuthStore.isPassenger" />
	</main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { Card, AddForm, PassengerRepository, usePassengerStore } from '@/features/Passengers';
import { useAuthStore } from '@/store/useAuthStore'
import { useMainStore } from '@/store/useMainStore'
import { ref } from 'vue';
const AuthStore = useAuthStore()
const AppStore = useMainStore()
const passengerStore = usePassengerStore()
const activeCard = ref(null)

function selectActive(id){
	if(activeCard.value == id) return activeCard.value = null 
	else return activeCard.value = id
}
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