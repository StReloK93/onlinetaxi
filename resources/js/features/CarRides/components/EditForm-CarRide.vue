<template>
	<v-dialog :attach="false" v-model="pageData.dialog" scrollable width="400px">
		<template v-slot:activator="{ props }">
			<v-btn size="x-small" v-bind="props" variant="plain" color="secondary" icon="mdi-pencil" />
		</template>
		<BaseForm :loading="pageData.overlay" :submit="submitFunction" @vue:mounted="getCarRide(propsParent.id)"
			title="Qatnovni tahrirlash" @close="pageData.dialog = false">
			<FormInputs ref="inputComponent" />
		</BaseForm>
	</v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { unformat } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import { FormInputs, CarRideRepository } from '..'
const inputComponent = ref()
const propsParent = defineProps(['id', 'submit'])


const pageData = reactive({
	dialog: false,
	car_ride: null,
	overlay: true
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await propsParent.submit(pageData.car_ride.id, formData)

	pageData.dialog = false
}


async function getCarRide(id) {
	pageData.overlay = true
	const ride = await CarRideRepository.show(id)

	pageData.car_ride = ride
	const formData = inputComponent.value.formData
	formData.user_car_id = ride.user_car_id
	formData.phone = ride.phone
	formData.day = ride.day
	formData.strictly_on_time = ride.strictly_on_time
	formData.price = ride.price
	formData.start_city = ride.start_city
	formData.end_city = ride.end_city
	formData.address_to_address = ride.address_to_address
	formData.free_seat = ride.free_seat
	formData.ends = []
	
	pageData.overlay = false
}
</script>