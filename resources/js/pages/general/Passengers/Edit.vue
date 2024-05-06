<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">
		<CustomForm :submit="submitFunction" title="Yo'lovchini tahrirlash" @close="pageData.dialog = false">
			<Inputs ref="inputComponent" />
		</CustomForm>
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
}
const pageData: PageData = reactive({
	dialog: false,
	passenger: null
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	await axios.put<IPassenger>(`passenger/${pageData.passenger.id}`, formData)
		.then(({ data }) => emit('update', data))
}




function getData(id) {
	axios.get<IPassenger>(`passenger/${id}`).then(({ data }) => {
		const formData: IPassenger = inputComponent.value.formData
		formData.name = data.name
		formData.phone = data.phone
		formData.start_region = data.start.region_id
		formData.end_region = data.end.region_id
		formData.ride_time = data.ride_time
		formData.with_trunk = Boolean(data.with_trunk)

		inputComponent.value.regionChanged(formData.start_region, 'start')
			.then(() => formData.start_city = data.start_city)
		inputComponent.value.regionChanged(formData.end_region, 'end')
			.then(() => formData.end_city = data.end_city)
	})
}

const toggle = (current) => {
	pageData.dialog = true
	pageData.passenger = current
	getData(current.id)
}
defineExpose({ toggle })
</script>