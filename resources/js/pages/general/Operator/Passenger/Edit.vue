<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<BaseForm :submit="submitFunction" title="Yo'lovchini tahrirlash" @close="pageData.dialog = false">
			<Inputs ref="inputComponent" :freeSeat="ride.free_seat - aviable" :familyCount="pageData.passenger.count" />
		</BaseForm>
	</v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Inputs from './Inputs.vue'
import { IPassenger } from '@/app/interfaces'
const parentProps = defineProps(['ride'])
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
const aviable = computed(() => parentProps.ride.passengers.reduce((acc, pass) => acc += pass.count, 0))
async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.start_city = parentProps.ride.cities[0].district_id
	formData.car_ride_id = parentProps.ride.id

	await axios.put<IPassenger>(`passenger/${pageData.passenger.id}`, formData)
		.then(({ data }) => emit('update', data))
}




function getData(id) {
	axios.get<IPassenger>(`passenger/${id}`).then(({ data }) => {
		const formData: IPassenger = inputComponent.value.formData
		formData.phone = data.phone
		formData.address = data.address
		formData.count = data.count
		formData.end_region = data.end.region_id

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