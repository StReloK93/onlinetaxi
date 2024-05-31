<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<template v-slot:activator="{ props }">
			<v-btn v-if="propsParent.smButton" v-bind="props" prepend-icon="mdi-pencil" size="x-small" variant="tonal"
				color="white">
				O'zgaritirish
			</v-btn>
			<v-btn v-else size="x-small" v-bind="props" variant="plain" icon="mdi-pencil" />
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
import { CarRideRepository, FormInputs , useCarRideStore } from '..'
const CarRideStore = useCarRideStore()
const inputComponent = ref()
const propsParent = defineProps(['id', 'smButton'])




const pageData = reactive({
	dialog: false,
	car_ride: null,
	overlay: true
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)

	await CarRideStore.update(pageData.car_ride.id, formData)
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
	formData.address_to_address = ride.address_to_address
	formData.free_seat = ride.free_seat
	formData.ends = []

	await Promise.all(ride.cities.map(async (city, index) => {
		formData.ends.push({ region: null, city: null, loading: false, districts: [] })
		await inputComponent.value.regionChanged(city.district.region_id, index)
		formData.ends[index].region = city.district.region_id
		formData.ends[index].city = city.district_id
		pageData.overlay = false
	}));

}
</script>