<template>
	<div class="w-100">
		<v-btn @click="pageData.dialog = true"  color="dark" variant="tonal" :loading="props.loading" block>
			Qatnov vaqti
		</v-btn>
		<v-dialog v-model="pageData.dialog" class="w-100">
			<v-card @vue:unmounted="">
				<v-card-title>
					<v-icon>mdi mdi-map-marker</v-icon>
					Qatnov vaqti
				</v-card-title>
				<v-card-text class="pa-0 position-relative" style="height: 300px;">
					<VDatePicker @update:modelValue="dateChange" transparent borderless expanded v-model="date" color="pink" />
					<Transition name="slide-up">
						<BaseTimePicker v-if="date" v-model="time" @back="date = null" class="position-absolute top-0 left-0 w-100 h-100 bg-white z-50" />
					</Transition>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseTimePicker from './BaseTimePicker.vue';
const props = defineProps(['loading'])

const date = defineModel('date')
const time = defineModel('time')
const pageData = reactive({
	dialog: false,
	hour: 12,
	minute: 0
})

function dateChange(event) {
	console.log('change', event);
}
</script>