<template>
	<main class="d-flex tw-flex-col">
		<AddForm v-if="Auth.isAnyAdmins || Auth.isDriver" />
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-1">
				<TransitionGroup name="list">
					<Card v-for="transport in transportStore.transports" :transport="transport" :key="transport.id" />
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { AddForm, Card, useTransport, TransportRepository } from '@/features/Transports'
import { useAuthStore } from '@/store/useAuthStore'
import { onMounted, onUnmounted } from 'vue';
const Auth = useAuthStore()
const transportStore = useTransport()

onMounted(async () => {
	transportStore.transports = await TransportRepository.onlyAuthUser()
})

onUnmounted(() => {
	transportStore.transports = null
})
</script>