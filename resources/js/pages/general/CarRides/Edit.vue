<template>
	<v-dialog v-model="pageData.dialog" scrollable width="600px">
		<template v-slot:activator="{ props }">
			<v-btn v-if="propsParent.smButton" v-bind="props" prepend-icon="mdi-pencil" size="x-small" variant="tonal"
				color="white">
				O'zgaritirish
			</v-btn>
			<v-btn v-else size="x-small" v-bind="props" variant="plain" icon="mdi-pencil" />
		</template>
		<CustomForm :submit="submitFunction" @vue:mounted="getCarRide(propsParent.id)" title="Qatnovni tahrirlash"
			@close="pageData.dialog = false">
			<Inputs ref="inputComponent" :edit="true" :date="propsParent.date" />
		</CustomForm>
	</v-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Inputs from './Inputs.vue'
import { unformat } from 'v-money3'
import { moneyConfig } from '@/modules/constants'
import { ICarRide } from '@/app/interfaces'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()

const inputComponent = ref()
const propsParent = defineProps(['date', 'id', 'smButton'])

const pageData = reactive({
	dialog: false,
	car_ride: null
})

async function submitFunction() {
	const formData = inputComponent.value.formData
	formData.price = unformat(formData.price, moneyConfig)
	await axios.put(`car-ride/${pageData.car_ride.id}`, formData)
		.then(async ({ data }) => {
			CarRide.update(data)
			pageData.dialog = false
		}
	)

}


function getCarRide(id) {
	axios.get<ICarRide>(`car-ride/${id}`).then(async ({ data }) => {
		pageData.car_ride = data

		const formData = inputComponent.value.formData
		formData.user_car_id = data.user_car_id
		formData.phone = data.phone
		formData.day = data.day
		formData.strictly_on_time = data.strictly_on_time
		formData.price = data.price
		formData.address_to_address = data.address_to_address
		formData.free_seat = data.free_seat
		formData.ends = []
		
		await Promise.all(data.cities.map(async (city, index) => {
			formData.ends.push({ region: null, city: null, loading: false, districts: [] })
			await inputComponent.value.regionChanged(city.district.region_id, index)
			formData.ends[index].region = city.district.region_id
			formData.ends[index].city = city.district_id
			inputComponent.value.clearOverlay()
		}));
	})
}
</script>