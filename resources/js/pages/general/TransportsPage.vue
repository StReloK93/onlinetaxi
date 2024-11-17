<template>
	<main class="d-flex tw-flex-col pa-2">
		<v-spacer class="position-relative">
			<main class="position-absolute top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden">
				<TransitionGroup name="list">
					<Card v-for="transport in transportStore.transports" :transport="transport" :key="transport.id" />
				</TransitionGroup>
			</main>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { Card, useTransport, TransportRepository } from '@/features/Transports'
import { onMounted, onUnmounted } from 'vue';
const transportStore = useTransport()

onMounted(async () => {
	transportStore.transports = await TransportRepository.index()
})

onUnmounted(() => {
	transportStore.transports = null
})
</script>