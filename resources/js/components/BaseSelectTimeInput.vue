<template>
	<div class="w-100">
		<v-btn @click="pageData.dialog = true" variant="tonal" :loading="props.loading" block>
			Qatnov vaqti
		</v-btn>
		<v-dialog v-model="pageData.dialog" class="w-100 max-w-500">
			<v-card @vue:unmounted="">
				<VDatePicker v-model.string="date" color="pink"/>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const props = defineProps(['loading'])

const date = defineModel('date')
const time = defineModel('time')
const pageData = reactive({
	dialog: false,
})



</script>