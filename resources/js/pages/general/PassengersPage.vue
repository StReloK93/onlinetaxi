<template>
	<main class="d-flex flex-column">
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<template v-if="passengerStore.passengers?.length">
						<Card @activate="selectActive" :activeCard="activeCard" :crud="true"
							v-for="passenger in passengerStore.passengers" :passenger="passenger" :key="passenger.id"
							class="mb-2" />
					</template>
					<!-- <v-alert v-else text="Yo'lovchilar topilmadi"></v-alert> -->
				</TransitionGroup>
			</main>
		</v-spacer>
		<AddForm/>
	</main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { Card, AddForm, PassengerRepository, usePassengerStore } from '@/features/Passengers';
import { useAuthStore } from '@/store/useAuthStore'
import { ref } from 'vue';
const AuthStore = useAuthStore()
const passengerStore = usePassengerStore()
const activeCard = ref(null)

function selectActive(id) {
	if (activeCard.value == id) return activeCard.value = null
	else return activeCard.value = id
}

onMounted(async () => {
	passengerStore.passengers = await PassengerRepository.index()
})
onUnmounted(() => {
	passengerStore.passengers = null
})
</script>