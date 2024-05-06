<template>
	<div class="tw-leading-3 d-flex align-center">
		<main>
			<v-label class="text-caption">
				{{ params.data.car.number }}
				<span class="ml-3">
					{{ params.data.phone}}
				</span>
			</v-label>
			<p class="">{{ params.data.car.type }}</p>
		</main>
		<main v-if="params.data.car.trunk" class="ml-4">
			<v-btn density="compact" variant="text" icon="">
				<v-tooltip activator="parent" location="bottom">
					Bagaj bor
				</v-tooltip>
				<v-icon>mdi-bag-suitcase</v-icon>
			</v-btn>
		</main>
	</div>
</template>

<script setup lang="ts">
const { params } = defineProps(['params'])
</script>