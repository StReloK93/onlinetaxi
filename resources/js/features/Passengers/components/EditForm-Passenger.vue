<template>
	<v-dialog v-model="pageData.dialog" scrollable persistent width="600px">

		<template v-slot:activator="{ props }">
			<v-btn size="x-small" v-bind="props" variant="plain" icon="mdi-pencil" />
		</template>

		<BaseForm :loading="pageData.loading" :submit="submitFunction" title="Yo'lovchini tahrirlash"
			@close="pageData.dialog = false" @vue:mounted="getPassenger()">
			<FormInputs ref="inputComponent" />
		</BaseForm>

	</v-dialog>
</template>
<script setup lang="ts">
import moment from 'moment'
import { FormInputs, IPassenger, usePassengerStore, PassengerRepository } from '..'
import { reactive, ref } from 'vue'

const parentProps = defineProps(['id'])
const inputComponent = ref()
const passengerStore = usePassengerStore()
const pageData = reactive({
	dialog: false,
	loading: false,
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	const day = moment(formData.day).format('YYYY-MM-DD')
	formData.ride_time = moment(`${day} ${formData.time}`).format('YYYY-MM-DD HH:mm')
	await passengerStore.update(parentProps.id, formData)
}




async function getPassenger() {
	pageData.loading = true
	
	const passenger = await PassengerRepository.show(parentProps.id)

	const formData: IPassenger = inputComponent.value.formData
	formData.phone = passenger.phone
	formData.address = passenger.address
	formData.start_region = passenger.start.region_id
	formData.end_region = passenger.end.region_id
	formData.price = passenger.price
	formData.count = passenger.count
	formData.ride_time = passenger.ride_time
	formData.day = moment(passenger.ride_time).format('YYYY-MM-DD')
	formData.time = moment(passenger.ride_time).format('HH:mm')
	formData.with_trunk = Boolean(passenger.with_trunk)

	inputComponent.value.regionChanged(formData.start_region, 'start')
		.then(() => formData.start_city = passenger.start_city)
	inputComponent.value.regionChanged(formData.end_region, 'end')
		.then(() => formData.end_city = passenger.end_city)

	pageData.loading = false
}
</script>