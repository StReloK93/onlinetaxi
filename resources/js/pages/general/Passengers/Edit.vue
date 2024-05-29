<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchini tahrirlash" @close="pageData.dialog = false">
			<Inputs ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
import { IPassenger } from '@/app/interfaces'
const inputComponent = ref()

const emit = defineEmits(['update'])

interface PageData {
	dialog: boolean,
	passenger: IPassenger,
	loading: Boolean,
}
const pageData: PageData = reactive({
	dialog: false,
	passenger: null,
	loading: false,
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	await axios.put<IPassenger>(`passenger/${pageData.passenger.id}`, formData)
		.then(({ data }) => emit('update', data))
}




function getData(id) {
	pageData.loading = true
	axios.get<IPassenger>(`passenger/${id}`).then(async ({ data }) => {
		const formData: IPassenger = inputComponent.value.formData
		formData.phone = data.phone
		formData.address = data.address
		formData.start_region = data.start.region_id
		formData.end_region = data.end.region_id
		formData.ride_time = data.ride_time
		formData.with_trunk = Boolean(data.with_trunk)

		await inputComponent.value.regionChanged(formData.start_region, 'start')
			.then(() => formData.start_city = data.start_city)
		await inputComponent.value.regionChanged(formData.end_region, 'end')
			.then(() => formData.end_city = data.end_city)

			pageData.loading = false
	})
}

const toggle = (current) => {
	pageData.dialog = true
	pageData.passenger = current
	getData(current.id)
}
defineExpose({ toggle })
</script>